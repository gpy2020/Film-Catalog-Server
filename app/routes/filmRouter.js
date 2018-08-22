const express = require("express");
const filmRouter = express.Router();
const Film = require("../models/film");
const categoryRouter = require("./categoryRouter");

filmRouter.use("/films/categories", categoryRouter);

filmRouter
  .route("/films")
  .get((req, res) => {
    Film.find({})
      .then(films => {
        res.json(films);
      })
      .catch(err => {
        res.send(err.message);
      });
  })
  .post((req, res) => {
    const film = new Film(req.body);
    film.save(err => {
      if (err) {
        return res.send(err.message);
      }
      res.json(film);
    });
  });

filmRouter
  .route("/films/:id")
  .get((req, res) => {
    Film.findById(req.params.id)
      .then(film => {
        if (!film) {
          return res.send(`Film '${req.param.title}' was not found!`);
        }
        res.json(film);
      })
      .catch(err => {
        res.send(err.message);
      });
  })
  .put((req, res) => {
    Film.findByIdAndUpdate(req.params.id, req.body)
      .then(film => {
        res.json(req.body);
      })
      .catch(err => {
        res.send(err.message);
      });
  })
  .delete((req, res) => {
    Film.findByIdAndRemove(req.params.id)
      .then(film => {
        if (!film) {
          return res.send(`Film '${req.params.title}' was not found!`);
        }
        res.send(`Film '${film.title}' was successfully removed!`);
      })
      .catch(err => {
        res.send(err.message);
      });
  });

module.exports = filmRouter;
