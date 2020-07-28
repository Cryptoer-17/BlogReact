const _ = require("lodash");

const articoloService = require("../services/articolo.service");

module.exports = (app) => {
 app.get("/articoli", async function (req, res) {
    try {
      console.log(req.query);
      console.log(req.userid);
      const articoli = await articoloService.findAll(req.userid, req.query);
      if (articoli.success) {
        res.send(articoli.data);
      } else {
        res.status(400).send(articoli.errors);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  }); 

  app.get("/articolo/:id", async function (req, res) {
    try {
      let id = req.params["id"];
      const articolo = await articoloService.findOne(id, req.userid);
      if (articolo.success) {
        res.send(articolo.data);
      } else {
        res.status(400).send(articolo.errors);
      }
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  });
  app.post("/articolo/save", async function (req, res) {
    try {
      const result = await articoloService.insertOne(req.body, req.userid);
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
  app.put("/articolo/update/:id", async function (req, res) {
    try {
      const id = req.params["id"];
      console.log(req.body);
      const result = await articoloService.updateOne(id, req.body, req.userid);
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
  app.delete("/articolo/delete/:id", async function (req, res) {
    try {
      let id = req.params["id"];
      const result = await articoloService.deleteOne(id, req.userid);
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
};