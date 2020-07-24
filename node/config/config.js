const config = {};

config.database = {
  name: "calendar",
  url: "mongodb://localhost:27017/calendar",
};
config.port = 3000;

config.secret = "supercalifragilisticexpialidocious";

module.exports = config;
