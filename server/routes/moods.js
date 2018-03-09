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
    .then(response => {
      res.json(response);
      console.log(response);
    })
    .catch(err => {
      next(err);
    });
});

// get combo via a mood

router.get("/:id", function(req, res, next) {
  Mood.findById(req.params.id, function(err, mood) {
    if (err) {
      //console.error(err);
    }
    console.log(mood);
    Keyword.find({ name: { $in: mood.keyWordMovie } }).exec((err, result) => {
      if (err) {
        // console.error(err);
      } else {
        var resultKeyword = [];

        for (i in result) {
          resultKeyword.push(result[i].id);
        }
        var keywordQuery = mood.keyWordMovie.join("%20%7C%20");

        movieFind
          .get("discover/movie?&with_keywords=" + keywordQuery)
          .then(listOfMovie => {
            if (err) console.log(err);
            else {
              const newCombo = {
                // creator: req.user.id,
                movie: listOfMovie
              };
              //console.log(listOfMovie);

              //   Combo.create(newCombo);
              //   console.log("je bloque");
              //   //console.log(keywordQuery);

              console.log(mood.keyWordMovie);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
    //console.log("je suis response    " + mood.keyWordMarmiton);
    //     Food.find({ keyWords: { $in: mood.keyWordMarmiton } })
    //       .limit(6)
    //       .then(recipeObjet => {
    //         Combo.findOneAndUpdate(newCombo, {
    //           // $set: { movie: listOfMovie.data.results }
    //         });
    //       });
  });
});
module.exports = router;
