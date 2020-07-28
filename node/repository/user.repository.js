const User = require("../models/user.model");
const mongoose = require("mongoose");

class UserRepository {
  async findOneByUsername(username) {
    try {
      return await User.findOne({ username: username }, (error, docs) => {
        return docs;
      });
    } catch (error) {
      return error;
    }
  }

  async findOneById(id) {
    try {
      return await Activity.findOne({ _id: id }, (error, docs) => {
        return docs;
      });
    } catch (error) {
      return error;
    }
  }

  async insertOne(user) {
    try {
      return new User({
        ...user,
        _id: new mongoose.Types.ObjectId(),
      }).save();
    } catch (error) {
      return error;
    }
  }

  async usernameExists(username) {
    try {
      return await User.find({ username: username }, (error, docs) => {
        return docs;
      });
    } catch (error) {
      return error;
    }
  }
  
  async emailExists(email) {
    try {
      return await User.find({ email: email }, (error, docs) => {
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
      let doc = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log(doc);
      return doc;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserRepository;
