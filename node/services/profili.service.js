const moment = require("moment");

const ProfiloRepository = require("../repository/profilo.repository");
const profiloRepository = new ProfiloRepository();

validateUpdate = (profilo, id) => {
  return profilo._id == id;
};
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
  },
  insertProfilo: async (profilo) => {
      const result = await profiloRepository.insertOne(profilo);
      return { success: true, errors: [], data: result };
  },
  updateOne: async (id, profilo, userId) => {
    let errors = [];

   if(userId){
    if (!validateUpdate(profilo, id)) {
      return { success: false, errors: ["profiloerror"] };
    }
    const filter = { _id: id };
    const result = await profiloRepository.updateOne(filter, profilo);
    return { success: true, errors: [], data: result };
  };
  },

};
