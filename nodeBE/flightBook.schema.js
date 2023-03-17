const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const flightBookSchema = new Schema({
  flight: { type: Schema.Types.ObjectId, ref: "flights" },
  user: { type: Schema.Types.ObjectId, ref: "users" },
});
const flightBookModel = mongoose.model("flightbooks", flightBookSchema);
module.exports = flightBookModel;
