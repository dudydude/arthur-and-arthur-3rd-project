var express = require("express");
var router = express.Router();
var axios = require("axios");
const Mood = require("../models/mood");
const Food = require("../models/recipe");
const Combo = require("../models/combo");
const Keyword = require("../models/keywordsTmdb");

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
});

const movieFind = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "f04b2a25baed952b84af0eb4623bbc55",
    inlude_adult: false,
    sort_by: "popularity.desc",
    page: 1
  }
});

// get all the moods

router.get("/", function(req, res, next) {
  Mood.find(function(err, moods) {
    if (err) {
      console.error(err);
    }
    console.log(moods);
  })
    .limit(5)
    .then(response => {
      res.json(response);
      console.log(response);
    });
});

// get combo via a mood

router.get("/:id", function(req, res, next) {
  Mood.findById(req.params.id, function(err, mood) {
    Keyword.find({ name: { $in: mood.keyWordMovie } }, function(err, keyword) {
      var resultKeyword = [];
      // console.log(keyword);
      for (i in keyword) {
        resultKeyword.push(keyword[i].id);
      }
      var keywordQuery = resultKeyword.join("%20%7C%20");
      console.log(keywordQuery);
      movieFind
        .get("discover/movie?&with_keywords=" + keywordQuery)
        .then(listOfMovie => {
          // console.log(mood.keyWordMarmiton);
          Food.find({ keyWords: { $in: mood.keyWordMarmiton } })
            .limit(6)
            .then(recipeObjet => {
              console.log(recipeObjet);
              const newCombo = {
                // creator: req.user.id,
                movie: listOfMovie.data.results,
                dish: recipeObjet
              };
              Combo.create(newCombo);
              res.json(newCombo);
            });
        });
    });
  });
});

module.exports = router;
