const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ArticoloModel = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  autore: mongoose.Schema.Types.String,
  categoria: mongoose.Schema.Types.String,
  data: mongoose.Schema.Types.Date,
  descrizione: mongoose.Schema.Types.String,
  img:mongoose.Schema.Types.String,
  like:mongoose.Schema.Types.Array,
  minuti:mongoose.Schema.Types.Number,
  sottotitolo:mongoose.Schema.Types.String,
  tags:mongoose.Schema.Types.Array,
  messaggi:mongoose.Schema.Types.Array,
  testo:mongoose.Schema.Types.String,
  titolo:mongoose.Schema.Types.String,
  userId:mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("articolo", ArticoloModel);