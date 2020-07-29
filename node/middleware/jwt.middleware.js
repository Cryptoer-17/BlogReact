const exjwt = require("express-jwt");
const config = require("../config/config");
const jwtMW = exjwt({
  secret: config.secret,
  algorithms: config.algorithms
});

module.exports = {
  jwtMiddleware: (req, res, next) => {
    const handleErrorNext = (err) => {
      console.log(err);
      if (err) {
        console.log('jwt middleware')
        if (err.name === "UnauthorizedError") {
          res.status(401).send("invalid token");
          return next();
        }
      }

      next(err);
    };

    jwtMW(req, res, handleErrorNext);
  },
};
