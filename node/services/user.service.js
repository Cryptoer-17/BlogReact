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
};

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
    const user = await userRepository.findOneByUsername(username);
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
        idToken: token,
        expiresIn: moment().add(1, "d"),
        localId:user._id,
        email:user.email
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
    const expireMillis = moment().endOf("day").valueOf() - moment().valueOf();
    const token = jwt.sign({ userid: userCreated._id}, config.secret, {
      expiresIn: expireMillis,
    });
    

    return { 
      success: true, 
      errors: [],
      idToken:token,
      expiresIn:moment().add(1,"d"),
      localId:userCreated._id,
      email:userCreated.username};
  },

  updatePassword: async (id, user, userId) => {
    let errors = [];


    if(userId){
    if (!validateUpdate(user, id)) {
      return { success: false, errors: ["usererror"] };
    }
    if (!validatePassword(user.password)) {
      return { success: false, errors: ["password weak"] };
    }
    const filter = { _id: id };
    const user_find = await userRepository.findOneByUsername(user.username);
    if(user_find){
      const hash = await bcrypt.hashSync(user.password, saltRounds);
    const updateUserPassword ={
      ...user_find._doc,
      password: hash,
    }
      const result = await userRepository.updateOne(filter, updateUserPassword);
      return { success: true, errors: [], data: result };
    }else{
      return { success: false, errors: ["username is incorrect"] };
    }
    
  };
  },
  updateEmail: async (id, user, userId) => {
    let errors = [];

    if(userId){
    if (!validateUpdate(user, id)) {
      return { success: false, errors: ["usererror"] };
    }
    const filter = { _id: id };
    const user_find = await userRepository.findOneById(id);
    if(user_find){
      const updateUserEmail = {
        ...user._doc,
        email:user.email,
        username:user.email
      }
      const result = await userRepository.updateOne(filter, updateUserEmail);
      return { success: true, errors: [], data: result };
    }else{
      return { success: false, errors: ["username "] };
    }
  };
  },
};
