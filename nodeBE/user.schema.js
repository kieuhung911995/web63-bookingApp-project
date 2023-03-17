const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: Schema.Types.String,
  password: Schema.Types.String,
  email: Schema.Types.String,
  phonenumber: Schema.Types.String,
  address: Schema.Types.String,
  birth: Schema.Types.Date,
  admin: Schema.Types.Boolean,
  avatar: Schema.Types.String,
  accessToken: Schema.Types.String,
  refreshToken: Schema.Types.String,
  createdAt: Schema.Types.Date,
  updatedAt: Schema.Types.Date,
});
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
