var express = require("express");
var router = express.Router();
var axios = require("axios");
const jwt = require("jwt-simple");
const passport = require("passport");
const config = require("../config");
var Combo = require("../models/combo");

const movieFind = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "f04b2a25baed952b84af0eb4623bbc55",
    inlude_adult: false
  }
});

// call api for a list of movies by name

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

// display movie page

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

// call api for a list of movies by genre

router.get("genre", function(req, res, next) {
  movieFind
    .get(`genre/${req.params.id}/movies`)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
