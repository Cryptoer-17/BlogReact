const moment = require("moment");

const ArticoloRepository = require("../repository/articolo.repository");
const articoloRepository = new ArticoloRepository();

validateUser = (articolo, userId) => {
  return articolo.userId == userId;
};
validateUpdate = (articolo, id) => {
  return articolo._id == id;
};
findById = (id) => {
  return articoloRepository.findOne(id);
};

module.exports = {
  insertOne: async (articolo, userId) => {
    const result = await articoloRepository.insertOne(articolo);
    return { success: true, errors: [], data: result };
  },
  updateOne: async (id, articolo, userId) => {
    let errors = [];
    console.log("prima dell'id");
    console.log(id);
    console.log("dopo l'id");
    if (!validateUser(articolo, userId)) {
      return { success: false, errors: ["user error"] };
    }
    if (!validateUpdate(articolo, id)) {
      return { success: false, errors: ["articolo error"] };
    }
    const filter = { _id: id };
    const result = await articoloRepository.updateOne(filter, articolo);
    return { success: true, errors: [], data: result };
  },
  deleteOne: async (id, userId) => {
    const filter = { _id: id };
    const articolo = await findById(id);
    console.log(articolo.userId);
    console.log(userId);
    if (!validateUser(articolo, userId)) {
      return { success: false, errors: ["user error"] };
    }
    const result = await articoloRepository.deleteOne(filter);
    return { success: true, errors: [], data: result };
  },
  findOne: async (id) => {
    let query = { _id: id };
    const result = await articoloRepository.findAll(query);
    return { success: true, errors: [], data: result };
  },
  findAll: async (userId, requestQuery = {}) => {
    let query = { userId: userId };
  /*  const { dateFrom, dateTo } = requestQuery;
    query = {
      ...query,
      ...(dateFrom && {
        dateStart: { $gte: moment(dateFrom).startOf("day").format() },
      }),
      ...(dateTo && {
        dateEnd: { $lte: moment(dateTo).endOf("day").format() },
      }),
    };
    console.log(query);*/
    const result = await articoloRepository.findAll(query);
    return { success: true, errors: [], data: result };
  },/*
  findByDay: async (userId, day) => {

    let query = { userId: userId };
    query = {
      ...query,
      dateStart: { $lte: moment(day).endOf("day").format() },
      dateEnd: { $gte: moment(day).startOf("day").format() },
    };
    console.log(query);
    const result = await eventRepository.findAll(query);
    return { success: true, errors: [], data: result };
  },
  //find by month
  findByMonth: async (userId, year, month) => {

    let query = { userId: userId };
    let startDate = moment([year, month]);
    query = {
      ...query,
      dateStart: { $gte:moment([year, month]).format() },
      dateEnd: { $lt: moment(startDate).endOf('month').format() },
    };
    console.log(query);
    const result = await eventRepository.findAll(query);
    return { success: true, errors: [], data: result };
  },*/
};