const Articolo = require("../models/articolo.model");
const mongoose = require("mongoose");

class ArticoloRepository {
  /*async findOne(id) {
    try {
      return await Event.findOne({ _id: id }, (error, docs) => {
        return docs;
      });
    } catch (error) {
      return error;
    }
  }*/

  async insertOne(articolo) {
    try {
      return new Articolo({
        ...articolo,
        _id: new mongoose.Types.ObjectId(),
      }).save();
    } catch (error) {
      return error;
    }
  }
/*
  async updateOne(filter, update) {
    console.log(filter);
    console.log(update);
    try {
      let doc = await Event.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log(doc);
      return doc;
    } catch (error) {
      return error;
    }
  }
  async deleteOne(filter) {
    console.log(filter);
    let doc = await Event.findOneAndDelete(filter);
    console.log(doc);
  }*/

  async findAll(query) {
    try {
      return await Articolo.find(query, (error, docs) => {
        return docs;
      });
    } catch (error) {
      return error;
    }
  }
}

module.exports = ArticoloRepository;
