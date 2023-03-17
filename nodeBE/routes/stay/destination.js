const { Destination } = require("../../models/stay/destination");
const { Image } = require("../../models/image");
const express = require("express");
const router = express.Router();

// Get all Stay Destination
router.get("/", async (req, res) => {
  const destination = await Destination.find().sort("name");
  res.send(destination);
});

// Add Stay Destination
router.post("/", async (req, res) => {
  const image = await Image.findById(req.body.imageId);

  const destination = await Destination.findOne({ name: req.body.name });
  if (destination && destination !== null)
    return res.status(401).send("This Destination already existed");

  const newDestination = { name: req.body.name };
  await Destination.insertMany(newDestination);
  res.send(newDestination);
});

module.exports = router;
