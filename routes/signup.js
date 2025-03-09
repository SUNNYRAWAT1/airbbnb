const express = require("express");
const signup = express.Router();
const path = require("path");
const rootdir = require("../utils/pathutils");
const fs = require("fs");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

// Serve the static CSS file
signup.use(express.static(path.join(rootdir, "../public", "signup.css")));

// Route to serve the signup.html file
signup.get("/signup.html", (req, res) => {
  fs.readFile(
    path.join(rootdir, "../views/signup.html"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.send(data);
    }
  );
});

// Route to handle signup requests
signup.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  fs.readFile("signupdata.txt", "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return res.status(500).send("Internal Server Error");
    }

    // Check for existing username
    const lines = data.split("\n");
    for (let line of lines) {
      if (line.startsWith(`username=${username}`)) {
        return res
          .status(400)
          .send("<p>Username already exists. Please choose another.</p>");
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare the data to be saved
    const dataToSave = `username=${username}\npassword=${hashedPassword}\n`;

    // Append the new user data to the file
    fs.appendFile("signupdata.txt", dataToSave, (err) => {
      if (err) {
        console.error("Error writing to file", err);
        return res.status(500).send("Internal Server Error");
      }
     res.redirect("/home");
     //   res.send("<p>Signup successful! Welcome!</p>");
    });
  });
});

// Redirect root path to /signup.html
signup.get("/", (req, res) => {
  res.redirect("/signup.html");
});

module.exports = signup;
