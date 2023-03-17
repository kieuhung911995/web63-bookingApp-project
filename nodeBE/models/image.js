const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageSrc: String,
});

const Image = mongoose.model("Image", imageSchema);

module.exports = { Image, imageSchema };
