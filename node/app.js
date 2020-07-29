const express = require("express");
const mongoose = require("mongoose");
/*const boot = require("./boot/boot");
// const graphql = require("./routes/graphql");*/
const config = require("./config/config");
const jwtMW = require("./middleware/jwt.middleware");
const userMW = require("./middleware/user.middleware");
// require("./cron/cron");
const bodyParser = require("body-parser");
const cors = require('cors');

//routes
const users = require("./routes/users");
const profili = require("./routes/profili");
const articoli = require("./routes/articoli");

const url = process.env.MONGODB_URI || config.database.url;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
const whitelist = ['http://localhost:3000', 'http://localhost:4200','http://localhost:4000']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}*/

app.use(cors(/*corsOptions*/));


// Add headers

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const unless = function (path, middleware) {
  return function (req, res, next) {
    if (path.includes(req.path)) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

app.use(
  unless(["/login", "/register"], function (req, res, next) {
    jwtMW.jwtMiddleware(req, res, next);
  })
);
app.use(
  unless(["/login", "/register"], function (req, res, next) {
    userMW.userMiddleware(req, res, next);
  })
);

users(app);
profili(app);
articoli(app);
/*
boot.initialize();
*/
app.listen(process.env.PORT || 4001, function () {
  console.log("Example app listening on port 4001!");
});
