var express = require("express");
var router = express.Router();
var axios = require("axios");

const movieFind = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "f04b2a25baed952b84af0eb4623bbc55"
  }
});

router.get("/", function(req, res, next) {
  movieFind
    .get(`/search/movie/`, {
      params: {
        query: req.query.query
      }
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/:id", function(req, res, next) {
  movieFind
    .get(`/movie/${req.params.id}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
