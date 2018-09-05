const express = require("express");
const router = express.Router();
const Film = require("../models/film");
const categoryRouter = require("./categoryRouter");

router.use("/films/categories", categoryRouter);

router.route("/films/pages/:pageNumber").get((req, res) => {
  const sortBy = req.query.sort;
  const searchRequest = req.query.search;

  console.log(sortBy);
  console.log(`page: ${req.params.pageNumber}`);
  const pageSize = 12;
  Film.find(
    searchRequest ? { title: { $regex: new RegExp(searchRequest, "i") } } : {}
  )
    .sort(sortBy ? { [sortBy]: sortBy === "rating" ? -1 : 1 } : { title: 1 })
    .skip(pageSize * req.params.pageNumber)
    .limit(pageSize)
    .then(films => {
      res.json(films);
    })
    .catch(err => {
      res.send(err.message);
    });
});
router.route("/films").post((req, res) => {
  const film = new Film(req.body);
  film.save(err => {
    if (err) {
      return res.send(err.message);
    }
    res.json(film);
  });
});

router
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
    console.log(req.body);
    Film.findByIdAndUpdate(req.params.id, req.body)
      .then(film => {
        console.log(req.body);
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

module.exports = router;
