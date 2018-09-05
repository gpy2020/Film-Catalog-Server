const express = require("express");
const router = express.Router();
const Category = require("../models/filmCategory");
const Film = require("../models/film");

router
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

router
  .route("/:_id/:pageNumber")
  .get((req, res) => {
    const pageSize = 12;
    Category.findById(req.params._id)
      .limit(pageSize)
      .skip(req.params.pageNumber * pageSize)
      .then(category => {
        Promise.all(
          category.films.map(filmID => {
            return Film.findById(filmID);
          })
        )
          .then(films => {
            res.json(films);
            console.log(films);
          })
          .catch(err => {
            res.send(err.message);
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
module.exports = router;
