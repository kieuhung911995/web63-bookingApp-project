const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const airlineSchema = new Schema({
  id: Schema.Types.String,
  airline: Schema.Types.String,
  airlineCode: [],
});
const airlineModel = mongoose.model("airlines", airlineSchema);
module.exports = airlineModel;
