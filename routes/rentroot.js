const express = require("express");
const rentPath = express.Router();
const path = require("path");

// Serve the rent page
rentPath.get("/rent.html", (req, res,next) => {
  // Use the absolute path to rent.html
  const filePath =
    "C:\\Users\\Sunny Rawat\\OneDrive\\Desktop\\another testing file\\views\\rent.html"; // Absolute path

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(err.status).end();
    }
  });
});

module.exports = rentPath;
