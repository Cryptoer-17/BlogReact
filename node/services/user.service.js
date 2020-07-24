const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const cache = require("memory-cache");
const config = require("../config/config");

const UserRepository = require("../repository/user.repository");
const userRepository = new UserRepository();

const saltRounds = 10;


validateUpdate = (user, id) => {
  return user._id == id;
};/* COMMENTATO
findById = (id) => {
  return activityRepository.findOne(id);
};*/

validateRegistration = async (user) => {
  let errors = [];
  console.log(user)
  const {username, email, password } = user;
  const usernameErrors = await usernameExists(username);
  if (usernameErrors.length > 0) {
    errors.push("username exists");
  }
  const emailErrors = await emailExists(email);
  if (emailErrors.length > 0) {
    errors.push("email exists");
  }

  if (!validatePassword(password)) {
    errors.push("password weak");
  }
  return { errors: errors };
};
usernameExists = (username) => {
  return userRepository.usernameExists(username);
};
emailExists = (email) => {
  return userRepository.emailExists(email);
};
validatePassword = (password) => {
  var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  return regex.test(password);
};

module.exports = {
  login: async (username, password) => {
    let errors = [];
    if (!(username && password)) {
      errors.push("payload error");
      return { success: false, errors: errors };
    }
    const user = await userRepository.findOne(username);
    if (!user) {
      errors.push("auth error");
      return { success: false, errors: errors };
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      errors.push("auth error");
      return { success: false, errors: errors };
    }
    const expireMillis = moment().endOf("day").valueOf() - moment().valueOf();
    const token = jwt.sign({ userid: user._id }, config.secret, {
      expiresIn: expireMillis,
    });
    return {
      success: true,
      errors: [],
      data: {
        token: token,
        expires: moment().add(1, "d"),
      },
    };
  },
  register: async (user) => {
    const { errors } = await validateRegistration(user);
    if (errors.length > 0) {
      return { success: false, errors: errors };
    }

    const hash = await bcrypt.hashSync(user.password, saltRounds);
    const userCreated = await userRepository.insertOne({
      ...user,
      password: hash,
     /* created_at: new Date(),*/
    });
    return { success: true, errors: [] };
  },
 /* findAll: async () => {
    const users = await userRepository.findAll();
    return { success: true, errors: [], data: users };
  },*/
  updateOne: async (id, user, userId) => {
    let errors = [];

   /* if (!validateUser(activity, userId)) {
      return { success: false, errors: ["user error"] };
    } */

    if(userId){
    if (!validateUpdate(user, id)) {
      return { success: false, errors: ["activityerror"] };
    }
    const filter = { _id: id };
    const result = await activityRepository.updateOne(filter, user);
    return { success: true, errors: [], data: result };
  };
  },
};
