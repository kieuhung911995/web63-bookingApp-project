const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Tao schema dk model (kieu du lieu chuan cua tung document trong colletion)
const citySchema = new Schema({
  id: Schema.Types.String,
  flyFrom: Schema.Types.String,
  flyTo: Schema.Types.String,
  cityFrom: Schema.Types.String,
});
const cityModel = mongoose.model("cities", citySchema);
module.exports = cityModel;
