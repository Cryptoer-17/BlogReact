const Profili = require("../models/profili.model");
const mongoose = require("mongoose");

class ProfiliRepository {
 /* async findOne(id) {
    try {
      return await Activity.findOne({ _id: id }, (error, docs) => {
        return docs;
      });
    } catch (error) {
      return error;
    }
  }

  async insertOne(activity) {
    try {
      return new Activity({
        ...activity,
        _id: new mongoose.Types.ObjectId(),
      }).save();
    } catch (error) {
      return error;
    }
  }

  async bulkInsert(collection) {
    try {
      return Activity.insertMany(collection, function (error, docs) {
        return docs;
      });
    } catch (error) {
      return error;
    }
  }*/


  async findAll(query) {
    try {
      return await Profili.find(query, (error, docs) => {
        return docs;
      });
    } catch (error) {
      return error;
    }
  }
  /*async findAllValid() {
    try {
      return await Activity.find({}, (error, docs) => {
        return docs;
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id) {
    try {
      return await Activity.findOne({ _id: id }, (error, docs) => {
        return docs;
      });
    } catch (error) {
      return error;
    }
  }

  async insertOne(event) {
    console.log(event);
    try {
      return new Activity({
        ...event,
        _id: new mongoose.Types.ObjectId(),
      }).save();
    } catch (error) {
      return error;
    }
  }

  async updateOne(filter, update) {
    console.log(filter);
    console.log(update);
    try {
      let doc = await Activity.findOneAndUpdate(filter, update, {
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
    let doc = await Activity.findOneAndDelete(filter);
    console.log(doc);
  }*/

  
}

module.exports = ProfiliRepository;
