var express = require("express");
var router = express.Router();
var axios = require("axios");
const Mood = require("../models/mood");
const Food = require("../models/recipe");

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
  Mood.findById(req.params.id, function(err, moodChoose) {
    if (err) {
      console.error(err);
    }
    // console.log("j'ai récup ce bon vieux moood  " + moodChoose);
  }).then(response => {
    //  console.log("je suis response    " + response.keyWordMarmiton);
    Food.find({ keyWords: { $in: response.keyWordMarmiton } })
      .limit(6)
      .exec((err, recipe) => {
        if (err) {
          console.error(err);
        } else {
          // console.log("je susi le recipe      " + recipe);
          const newCombo = {
            creator: req.user.id,
            dish: recipe
          };
          Combo.create(newCombo);
          console.log("je bloque");
          // var keywordQuery = mooChoose.keyWordMovie.join("%20%7C%20");
          // console.log(keywordQuery);
          // movieFind
          //   .get("discover/movie?&with_keywords=" + keywordQuery)
          //   .catch(err => {
          //     console.error(err);
          //   });
        }
      })
      .catch(err => {
        if (err) console.log(error);
      });
  });
});

module.exports = router;
