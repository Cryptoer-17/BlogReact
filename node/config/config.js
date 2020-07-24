const config = {};

config.database = {
  name: "blog",
  url: "mongodb://localhost:27017/blog",
};
config.port = 3000;

config.secret = "supercalifragilisticexpialidocious";

module.exports = config;
