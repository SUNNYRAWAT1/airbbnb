const express = require("express");
const loginPage = express.Router();
const path = require("path");
const fs = require("fs");
const rootdir = require("../utils/pathutils");
const bcrypt = require("bcrypt"); // Import bcrypt for password comparison

// Serve static files (CSS)
loginPage.use(express.static(path.join(rootdir, "../public")));

// Route to serve the login.html file
loginPage.get("/login.html", (req, res, next) => {
  fs.readFile(
    path.join(rootdir, "../views/login.html"),
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

// Route to handle login requests
loginPage.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Read the signup data file
  fs.readFile("signupdata.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    // Split the file content into lines
    const lines = data.split("\n");

    // Check if the username exists and get the hashed password
    let storedHashedPassword = null;
    for (let line of lines) {
      if (line.startsWith(`username=${username}`)) {
        // Get the corresponding password line
        const passwordLine = lines[lines.indexOf(line) + 1]; // The next line should be the password
        if (passwordLine && passwordLine.startsWith("password=")) {
          storedHashedPassword = passwordLine.split("=")[1]; // Extract the hashed password
        }
        break;
      }
    }

    // If the username was found, compare the password
    if (storedHashedPassword) {
      bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).send("Internal Server Error");
        }

        if (isMatch) {
          res.redirect("/home");
          //  res.send("<p>Login successful! Welcome back!</p>");
        } else {
          res
            .status(401)
            .send("<p>Login failed. Invalid username or password.</p>");
        }
      });
    } else {
      // Username not found
      res
        .status(401)
        .send("<p>Login failed. Invalid username or password.</p>");
    }
  });
});

// Redirect root path to /login.html
loginPage.get("/", (req, res) => {
  res.redirect("/login.html");
});

module.exports = loginPage;
