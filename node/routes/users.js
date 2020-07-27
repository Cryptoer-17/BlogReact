const _ = require("lodash");

const userService = require("../services/user.service");

module.exports = (app) => {
  
 /* app.get("/users", async function (req, res) {
    try {
      const users = await userService.findAll();
      if (users.success) {
        res.send(users.data);
      } else {
        res.status(400).send(users.errors);
      }
    } catch (err) {
      console.log(err);
      console.log("err");
      res.status(500).send("error");
    }
  });*/
  app.post("/login", async function (req, res) {
    try {
      const { username, password } = req.body;
      console.log(username,password);
      const user = await userService.login(username, password);
      if (user.success) {
        res.send(user.data);
      } else {
        res.status(400).send(user.errors);
      }
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  });
  app.post("/register", async function (req, res) {
    try {
      const user = await userService.register(req.body);
      console.log(user);
      if (user.success) {
        res.send(user);
      } else {
        res.status(400).send(user.errors);
      }
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  });
   app.put("/password/update/:id", async function (req, res) {
    try {
      const id = req.params["id"];
      console.log(req.userid);
      console.log(req.body);
      const result = await userService.updatePassword(id, req.body, req.userid);
      if (result.success) {
        res.send(result);
      } else {
        res.status(400).send(result.errors);
      }
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  });
  app.put("/email/update/:id", async function (req, res) {
    try {
      const id = req.params["id"];
      console.log(req.userid);
      console.log(req.body);
      const result = await userService.updateEmail(id, req.body, req.userid);
      if (result.success) {
        res.send(result);
      } else {
        res.status(400).send(result.errors);
      }
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  });
};
