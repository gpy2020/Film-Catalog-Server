const express = require("express");
const categoryRouter = express.Router();
const Category = require("../models/filmCategory");
const Film = require("../models/film");

categoryRouter
  .route("/")
  .get((req, res) => {
    Category.find({})
      .then(categories => {
        res.send(categories);
      })
      .catch(err => {
        res.json(err);
      });
  })
  .post((req, res) => {
    const category = new Category(req.body);
    category.save(err => {
      if (err) {
        return res.send(err.message);
      }
      res.json(category);
    });
  });

categoryRouter
  .route("/:_id")
  .get((req, res) => {
    Category.findById(req.params._id)
      .then(category => {
        Promise.all(
          category.films.map(filmID => {
            return Film.findById(filmID);
          })
        ).then(films => {
          res.json(films);
        });
      })
      .catch(err => res.send(err));
  })
  .put((req, res) => {
    Category.findByIdAndUpdate(req.params._id, req.body)
      .then(category => {
        res.json(`Category '${category.title}' was successfully updated!`);
      })
      .catch(err => res.send(err.message));
  })
  .delete((req, res) => {
    Category.findByIdAndRemove(req.params._id)
      .then(category => {
        res.send(`Category '${category.title}' was successfully removed!`);
      })
      .catch(err => res.send(err.message));
  });
module.exports = categoryRouter;
