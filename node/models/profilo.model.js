const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProfiloModel = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: mongoose.Schema.Types.String,
  cognome: mongoose.Schema.Types.String,
  dataNascita: mongoose.Schema.Types.Date,
  descrizione: mongoose.Schema.Types.String,
  img:mongoose.Schema.Types.String,
  nazionalità:mongoose.Schema.Types.String,
  numeroTelefono:mongoose.Schema.Types.Number,
  sesso:mongoose.Schema.Types.String,
  userId:mongoose.Schema.Types.ObjectId,
  username:mongoose.Schema.Types.String
});

module.exports = mongoose.model("profilo", ProfiloModel);
