const { Image } = require("../../models/image");
const { Category } = require("../../models/stay/category");
const { Amenity } = require("../../models/stay/amenity");
const { Room } = require("../../models/stay/room");
const { Hotel } = require("../../models/stay/hotel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Create New Hotel
router.post("/", async (req, res) => {
  const images = await Image.find({
    _id: {
      $in: req.body.imageId,
    },
  });
  const category = await Category.findById(req.body.categoryId);
  const amenities = await Amenity.find({
    _id: {
      $in: req.body.amenityId,
    },
  });
  const logo = await Image.findById(req.body.logoId);

  const hotel = {
    hotelName: req.body.hotelName,
    destination: req.body.destination,
    star: req.body.star,
    address: req.body.address,
    images: images,
    category: { name: category.name },
    amenities: amenities,
    logo: logo,
  };

  await Hotel.insertMany(hotel);
  res.send(hotel);
});

// Edit Hotel Information
router.put("/:id", async (req, res) => {
  const images = await Image.find({
    _id: {
      $in: req.body.imageId,
    },
  });
  const category = await Category.findById(req.body.categoryId);
  const amenities = await Amenity.find({
    _id: {
      $in: req.body.amenityId,
    },
  });
  const logo = await Image.findById(req.body.logoId);

  const room = await Room.find(
    {
      _id: {
        $in: req.body.roomId,
      },
    },
    "_id"
  );

  const hotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    {
      hotelName: req.body.hotelName,
      destination: req.body.destination,
      star: req.body.star,
      address: req.body.address,
      category: category,
      logo: logo,
      amenities: amenities,
      images: images,
    },
    { new: true }
  );

  if (room) {
    hotel.room = room;
  }
  await hotel.save();
  res.send(hotel);
});

// Get Hotel Data Detail with Hotel ID
router.get("/:hotelId", async (req, res) => {
  const hotel = await Hotel.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.params.hotelId) } },
  ]).lookup({
    from: "rooms",
    localField: "room",
    foreignField: "_id",
    as: "roomInfo",
    pipeline: [
      {
        $sort: {
          basePrice: 1,
        },
      },
    ],
  });

  res.send(hotel[0]);
});

module.exports = router;
