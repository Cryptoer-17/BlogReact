const config = {};

config.database = {
  name: "blog",
  url: "mongodb://localhost:27017/blog",
};
config.port = 3000;

config.secret = "supercalifragilisticexpialidocious";
config.algorithms = ['HS256'];
module.exports = config;
