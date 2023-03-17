const { imageSchema } = require("../image");
const { categorySchema } = require("./category");
const { amenitySchema } = require("./amenity");

const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  hotelName: String,
  destination: String,
  star: { type: Number, min: 1, max: 5 },
  address: String,
  images: [imageSchema],
  category: categorySchema,
  amenities: [amenitySchema],
  logo: imageSchema,
  room: { type: [mongoose.Schema.Types.ObjectId], default: undefined },
  review: { type: [mongoose.Schema.Types.ObjectId], default: undefined },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = { Hotel, hotelSchema };
