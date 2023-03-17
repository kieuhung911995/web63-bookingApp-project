const { Amenity } = require("../../models/stay/amenity");
const { Image } = require("../../models/image");
const express = require("express");
const router = express.Router();

// Get Amenities Data
router.get("/", async (req, res) => {
  const result = await Amenity.find().sort("name");
  res.send(result);
});

//Add Amenities
router.post("/", async (req, res) => {
  const amenity = await Amenity.findOne({ name: req.body.name });
  if (amenity && amenity != null)
    return res.status(401).send("This amenity already existed");

  const newAmenity = {
    name: req.body.name,
  };
  await Amenity.insertMany(newAmenity);
  res.send(newAmenity);
});

module.exports = router;
