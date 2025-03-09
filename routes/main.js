const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const dataEntered = require("./dataroot");
const homePath = require("./homeroot");
const rentPath = require("./rentroot");
const rootdir = require("../utils/pathutils");
const loginPage = require("./loginPage");
const signup = require("./signup"); 
    
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootdir, "../public"))); // Serve static files

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});      
// Routes
app.use(loginPage); // This will now respond to /login
app.use(signup);
app.use(homePath);
app.use(rentPath);
app.use(dataEntered);

// Start the server
const port = 8776;
app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}`);
});
