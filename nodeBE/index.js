const { getSortItem } = require("./util");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const mongoose = require("mongoose");
const validateToken = require("./validateToken");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3001;

const flightModel = require("./flight.schema");
const cityModel = require("./city.schema");
const airlineModel = require("./airline.schema");
const userModel = require("./user.schema");
const flightBookModel = require("./flightBook.schema");
const { Hotel } = require("./models/stay/hotel");

// Stay API Section
const amenity = require("./routes/stay/amenity");
const stayCategory = require("./routes/stay/category");
const image = require("./routes/image");
const room = require("./routes/stay/room");
const hotel = require("./routes/stay/hotel");
const destination = require("./routes/stay/destination");

mongoose.connect(
  "mongodb+srv://kieuhung911995:dax0ayluatinh@cluster0.b3turl4.mongodb.net/golobeWeb"
);

app.use(morgan("combined"));
app.use(express.json());
app.use(cors());
app.options("*", (req, res) => {
  res
    .writeHead(200, "", {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS",
    })
    .end();
});
app.use("/public", express.static("public"));
app.use("/api/image", image);
app.use("/api/stay/amenity", amenity);
app.use("/api/stay/category", stayCategory);
app.use("/api/stay/room", room);
app.use("/api/stay/hotel", hotel);
app.use("/api/stay/destination", destination);

app.get("/ping", async (req, res) => {
  try {
    res.status(200).send("Kiem tra trang thai");
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: `${req.body.username}`,
    });
    if (!user) {
      res.status(400).send("user is not exist");
    } else {
      //so sanh pass da ma hoa
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (!result) {
          res.status(404).send("wrong password");
        } else {
          //accessToken
          const accessToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 1000 }
          ); //token het han sau 5s
          //refreshToken
          const refreshToken = jwt.sign(
            { id: user._id, username: user.username }, // payload
            process.env.REFRESH_TOKEN_SECRET, // secret key để tạo token
            {
              expiresIn: 2000, //Exprire time of refresh token
            }
          );
          //luu token vao db
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          user.save();
          res.status(200).send({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/logout", async (req, res) => {
  const { accessToken, refreshToken } = req.body;
  const user = await userModel.findOne({ accessToken, refreshToken });
  if (user) {
    user.accessToken = "";
    user.refreshToken = "";
    user.save();
  }
  res.send("logout success");
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    //ma hoa password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const user = await userModel.create({
      username: `${req.body.username}`,
      password: `${hashPass}`,
      email: `${req.body.email}`,
      phonenumber: `${req.body.phone}`,
      address: `${req.body.address}`,
      birth: `${req.body.birth}`,
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

// app.get("/dashboard", validateToken, async (req, res) => {
//   const user = await userModel.find();
//   res.send(user);
// });

app.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    const user = await userModel.findOne({ refreshToken: refreshToken });
    if (!refreshToken) return res.sendStatus(400);

    if (!user) return res.sendStatus(400);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) res.sendStatus(403);

      const accessToken = jwt.sign(
        { username: data.username, id: data.id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2000s", // Expires after 30s of login
        }
      );

      res.status(200).send({ accessToken: accessToken });
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(402);
  }
});

app.get("/flight/city", async (req, res) => {
  try {
    const input = await cityModel.find();
    res.status(200).send(input);
  } catch (error) {
    console.log(error);
  }
});

app.get("/flight/airline", async (req, res) => {
  try {
    const input = await airlineModel.find();
    res.status(200).send(input);
  } catch (error) {
    console.log(error);
  }
});

app.get("/flight/:flightId", async (req, res) => {
  try {
    const result = await flightModel.find({ _id: req.params.flightId });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/flight", async (req, res) => {
  try {
    const result = await flightModel.aggregate(
      [
        {
          $match: {
            cityFrom: req.query.cityFrom || { $ne: null },
            cityTo: req.query.cityTo || { $ne: null },
            trip: req.query.trip || { $ne: null },
            departureTime: req.query.startDate
              ? { $gte: Number(req.query.startDate) }
              : {
                  $ne: null,
                },
            arrivalTime: req.query.endDate
              ? { $lte: Number(req.query.endDate) }
              : {
                  $ne: null,
                },
            price: {
              $gte: Number(req.query.priceMin),
              $lte: Number(req.query.priceMax),
            },
            departureHour: {
              $gte: Number(req.query.departureTimeMin),
              $lte: Number(req.query.departureTimeMax),
            },
            rating: { $gte: Number(req.query.rate) },
            airlineName: req.query.airline
              ? { $in: req.query.airline.split(",") }
              : { $ne: null },
          },
        },
        { $sort: getSortItem(req.query.sort) },
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: [
              { $skip: Number(req.query.skip) },
              { $limit: Number(req.query.limit) },
            ],
          },
        },
      ],
      { allowDiskUse: true }
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

app.post("/book", validateToken, async (req, res) => {
  try {
    const book = await flightBookModel.create({
      flight: req.body.flightId.toString(),
      user: req.user._id.toString(),
    });
    res.status(200).send(book);
  } catch (error) {
    console.log(error);
  }
});

app.get("/book/:bookId", validateToken, async (req, res) => {
  try {
    const book = await flightBookModel
      .findById(req.params.bookId)
      .populate(["user", "flight"]);
    res.status(200).send(book);
  } catch (error) {
    console.log(error);
  }
});

app.get("/history", validateToken, async (req, res) => {
  try {
    const history = await flightBookModel
      .find({ user: req.user._id })
      .populate("flight");
    res.status(200).send(history);
  } catch (error) {
    console.log(error);
  }
});
//Route sua DB
// app.patch("/update", async (req, res) => {
//   try {
//     const result = await Hotel.find();
//     result.map((data) => {
//       data.img.data.save();
//     });
//     res.send("ok");
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
