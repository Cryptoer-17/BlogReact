const Profilo = require("../models/profilo.model");
const mongoose = require("mongoose");

class ProfiloRepository {

  async insertOne(profilo) {
    try {
      return new Profilo({
        ...profilo,
        _id: new mongoose.Types.ObjectId(),
      }).save();
    } catch (error) {
      return error;
    }
  }

  async findAll(query) {
    try {
      return await Profilo.find(query, (error, docs) => {
        return docs;
      });
    } catch (error) {
      return error;
    }
  }

  async updateOne(filter, update) {
    console.log(filter);
    console.log(update);
    try {
      let doc = await Profilo.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log(doc);
      return doc;
    } catch (error) {
      return error;
    }
  }


  
}

module.exports = ProfiloRepository;
