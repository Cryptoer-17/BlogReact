const jwt = require("jsonwebtoken");

module.exports = {
  userMiddleware: (req, res, next) => {
    console.log('middleware');
    if(req.headers.authorization){
      const token = req.headers.authorization.replace("Bearer ", "");
      const decoded = jwt.decode(token);
      console.log(decoded);
      req.userid = decoded.userid;
      next();
    }
    else {
      console.log('next')
      next();
    }
  },
};