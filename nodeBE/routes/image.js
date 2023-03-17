const multer = require("multer");
const { Image } = require("../models/image");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

router.post("/", upload.single("imageSrc"), async (req, res, next) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  if (!req.file) return res.send("Please select image to upload");

  const url = req.protocol + "://" + req.get("host");
  const newImg = { imageSrc: url + "/public/" + req.file.filename };
  await Image.insertMany(newImg);

  res.status(201).send({ Message: "Upload Success", File: newImg });
});

router.get("/", async (req, res) => {
  const result = await Image.find();
  res.send(result);
});

module.exports = router;
