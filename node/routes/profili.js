const _ = require("lodash");

const profiliService = require("../services/profili.service");

module.exports = (app) => {
  app.get("/profili", async function (req, res) {
    const flagValid = req.query["flagValid"];
    try {
      const profili = await profiliService.findAll(flagValid);
      if (profili.success) {
        res.send(profili.data);
      } else {
        res.status(400).send(profili.errors);
      }
    } catch (err) {
      console.log(err);
      console.log("err");
      res.status(500).send("error");
    }
  });
  
  


  app.post("/profilo/save", async function (req, res) {
    try {
      const result = await profiliService.insertProfilo(req.body, req.userid);
      console.log(req)
      if (result.success) {
        res.send(result.data);
      } else {
        res.status(400).send(result.errors);
      }
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  });

  app.put("/profilo/update/:id", async function (req, res) {
    try {
      const id = req.params["id"];
      console.log(req.userid);
      console.log(req.body);
      const result = await profiliService.updateOne(id, req.body, req.userid);
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