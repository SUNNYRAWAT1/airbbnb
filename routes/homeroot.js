const express = require("express");
const homePath = express.Router();
const path = require("path");
const rootdir = require("../utils/pathutils");

// Serve the home page
homePath.get("/home", (req, res, next) => {
  // const filePath =
    res.sendFile(path.join(rootdir, '../views','index.html'));
     // Corrected path to index.html
//   res.sendFile(filePath, (err) => {
//     if (err) {                                             
//       console.error("Error sending file:", err);
//       res.status(err.status).end();
//     }
//   });
 });
module.exports = homePath;
                                     