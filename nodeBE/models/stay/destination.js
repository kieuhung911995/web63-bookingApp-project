const mongoose = require("mongoose");
const { imageSchema } = require("../image");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: imageSchema,
  description: String,
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = {
  Destination,
  destinationSchema,
};
