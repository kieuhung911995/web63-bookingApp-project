const mongoose = require("mongoose");
const { imageSchema } = require("../image");

const amenitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: imageSchema,
});

const Amenity = mongoose.model("Amenity", amenitySchema);

module.exports = { Amenity, amenitySchema };
