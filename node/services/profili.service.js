const moment = require("moment");


const ProfiloRepository = require("../repository/profilo.repository");
const profiloRepository = new ProfiloRepository();

/*
validateUser = (activity, userId) => {
  return activity.userId == userId;
}; 


/* COMMENTATO
validateUpdate = (activity, id) => {
  return activity._id == id;
};
findById = (id) => {
  return activityRepository.findOne(id);
};*/


module.exports = {
  findAll: async (flagValid) => {
    let query = {};
    if (flagValid) {
      query = {
        ...query,
        validityStart: { $gte: moment().format() },
        validityEnd: { $lt: moment().format() },
      };
    }
    const result = await profiloRepository.findAll(query);
    return { success: true, errors: [], data: result };
  },/* COMMENTATO
  insertActivity: async (activity) => {
    const result = await activityRepository.insertOne(activity);
    return { success: true, errors: [], data: result };
  },
  bulkInsert: async (collection) => {
    const arr = collection.map((activity) => {
      return {
        ...activity,
        created_at: moment().utc(),
        updated_at: moment().utc(),
      };
    });
    const result = await activityRepository.bulkInsert(arr);
    return { success: true, errors: [], data: result };
  },
  updateOne: async (id, activity, userId) => {
    let errors = [];*/

   /* if (!validateUser(activity, userId)) {
      return { success: false, errors: ["user error"] };
    } */

  /*  COMMENTATO if(userId){
    if (!validateUpdate(activity, id)) {
      return { success: false, errors: ["activityerror"] };
    }
    const filter = { _id: id };
    const result = await activityRepository.updateOne(filter, activity);
    return { success: true, errors: [], data: result };
  };
  },
  deleteOne: async (id, userId) => {
    if(userId){
    const filter = { _id: id };
    const activity = await findById(id);
    console.log(userId);*/
   /* if (!validateUser(activity, userId)) {
      return { success: false, errors: ["user error"] };
    }  */
 /*  COMMENTATO  const result = await activityRepository.deleteOne(filter);
    return { success: true, errors: [], data: result };
  }
},
  findOne: async (userId) => {
    let query = { userId: userId };
    const result = await activityRepository.findAll(query);
    return { success: true, errors: [], data: result };
  },*/
};
