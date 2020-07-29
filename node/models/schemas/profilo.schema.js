const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProfiloSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: mongoose.Schema.Types.String,
    cognome: mongoose.Schema.Types.String,
    data_nascita: mongoose.Schema.Types.Date,
    descrizione: mongoose.Schema.Types.String,
    img:mongoose.Schema.Types.String,
    nazionalita:mongoose.Schema.Types.String,
    numero_telefono:mongoose.Schema.Types.Number,
    sesso:mongoose.Schema.Types.String,
    userId:mongoose.Schema.Types.ObjectId,
    username:mongoose.Schema.Types.String
});
module.exports = {
  Profili: ProfiloSchema,
};
