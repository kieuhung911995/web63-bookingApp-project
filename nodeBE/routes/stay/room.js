const express = require("express");
const router = express.Router();

const { Room } = require("../../models/stay/room");
const { Hotel } = require("../../models/stay/hotel");
const { Image } = require("../../models/image");

// Create Room
router.post("/", async (req, res) => {
  const images = await Image.find({
    _id: {
      $in: req.body.imageId,
    },
  });
  const hotel = await Hotel.findById(req.body.hotelId);
  if (!hotel) return res.status(401).send("No hotel found");
  const room = {
    roomName: req.body.roomName,
    numberInStock: req.body.numberInStock,
    basePrice: req.body.basePrice,
    availableGuest: req.body.availableGuest,
    images: images,
    hotel: hotel._id,
    bookedDate: [],
  };

  await Room.insertMany(room);
  res.send({ message: "Room created success", room });
});

// Edit Room
router.put("/:id", async (req, res) => {
  let images = await Image.find({
    _id: {
      $in: req.body.imageId,
    },
  });
  const hotel = await Hotel.findById(req.body.hotelId);
  if (!hotel) return res.status(401).send("No hotel found");

  const room = await Room.findByIdAndUpdate(
    req.params.id,
    {
      roomName: req.body.roomName,
      numberInStock: req.body.numberInStock,
      basePrice: req.body.basePrice,
      availableGuest: req.body.availableGuest,
      images: images,
      hotel: hotel,
    },
    { new: true }
  );

  if (req.body.checkIn && req.body.checkOut) {
    room.bookedDate.push({
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
    });
  }
  await room.save();
  res.send(room);
});

// Get Room Data with query params
router.get("/", async (req, res) => {
  console.log("Req Query:", req.query);
  //Match Query Object
  let matchQuery = {
    $and: [
      {
        basePrice: {
          $gte: Number(req.query.minPriceFilter),
          $lte: Number(req.query.maxPriceFilter),
        },
      },
      { "hotelInfo.category.name": req.query.category },
    ],
  };
  if (req.query.destination) {
    matchQuery.$and.push({ "hotelInfo.destination": req.query.destination });
  }

  if (req.query.amenities) {
    matchQuery.$and.push({
      "hotelInfo.amenities.name": { $all: req.query.amenities },
    });
  }

  if (req.query.countGuest && req.query.countRoom) {
    let availableGuest =
      Number(req.query.countGuest) / Number(req.query.countRoom);
    if (Number(req.query.countGuest) % Number(req.query.countRoom) === 0) {
      matchQuery.$and.push({
        availableGuest: {
          $eq: availableGuest,
        },
        numberInStock: {
          $gt: 0,
        },
      });
    } else {
      matchQuery.$and.push({
        availableGuest: {
          $gt: availableGuest,
        },
        numberInStock: {
          $gt: 0,
        },
      });
    }
  }

  if (req.query.checkIn && req.query.checkOut) {
    let checkIn = new Date(req.query.checkIn);
    let checkOut = new Date(req.query.checkOut);
    matchQuery.$and.push({
      $or: [
        {
          "bookedDate.checkIn": { $gt: checkOut },
        },
        { "bookedDate.checkOut": { $lt: checkIn } },
      ],
    });
  }

  // Set Hotel Lookup Query
  const hotelLookupQuery = {
    from: "hotels",
    localField: "hotel",
    foreignField: "_id",
    as: "hotelInfo",
  };

  // Set Page for Response Data
  let pageIndex = Number(req.query.pageIndex);
  let pageSize = Number(req.query.pageSize);
  let skip = (pageIndex - 1) * pageSize;

  // Sort Condition
  const sortCondition = {
    "newRoot.basePrice": 1,
  };
  if (req.query.sortBy === "minPrice") {
    sortCondition["newRoot.basePrice"] = 1;
  }
  if (req.query.sortBy === "maxPrice") {
    sortCondition["newRoot.basePrice"] = -1;
  }

  const room = await Room.aggregate()
    .lookup(hotelLookupQuery)
    .unwind({ path: "$hotelInfo" })
    .match(matchQuery)
    .project({ hotelInfo: 1, basePrice: 1 })
    .sort({ basePrice: 1 })
    .group({
      _id: "$hotelInfo._id",
      doc: {
        $first: "$$ROOT",
      },
    })
    .replaceRoot({ newRoot: "$doc" })
    .sort(sortCondition)
    .skip(skip)
    .limit(pageSize);

  res.send(room);
});

//Get Room Detail
router.get("/:id", async (req, res) => {
  const result = await Room.findById(req.params.id);
  res.send(result);
});

module.exports = router;
