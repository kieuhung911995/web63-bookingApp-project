const { imageSchema } = require("../image");

const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: String,
  numberInStock: Number,
  basePrice: Number,
  availableGuest: Number,
  images: [imageSchema],
  bookedDate: {
    type: [
      {
        checkIn: { type: Date },
        checkOut: { type: Date },
      },
    ],
  },
  hotel: mongoose.Schema.Types.ObjectId,
});

const Room = mongoose.model("room", roomSchema);

module.exports = { Room, roomSchema };
