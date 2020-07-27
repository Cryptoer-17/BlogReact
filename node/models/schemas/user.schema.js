const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
  username:mongoose.Schema.Types.String,
});

module.exports = {
  User: UserSchema,
};
