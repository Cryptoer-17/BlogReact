const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserModel = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
  username:mongoose.Schema.Types.String,
});

module.exports = mongoose.model("user", UserModel);
