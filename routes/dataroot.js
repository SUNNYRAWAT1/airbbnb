const express = require("express");
const dataenterd = express.Router();
const path = require("path");
const fs = require("fs");
// Handle form submission
dataenterd.post("/submit-house-detail", (req, res, next) => {
  const { HouseName, HouseNumber, Rent, Location } = req.body;
  // now saving the input into a txt file
  const data = `HouseName=${HouseName}; \nHouseNumber=${HouseNumber}; \nRent=${Rent}; \nLocation=${Location}\n`;
  fs.appendFile("data.txt", data, (err) => {
    if (err) {
      console.error("Error writing to file", err);
      return res.status(500).send("Internal Server Error");
    }
    res.send("<p>Rented house data is stored  successful! Welcome!</p>");
  });
});
module.exports = dataenterd;
