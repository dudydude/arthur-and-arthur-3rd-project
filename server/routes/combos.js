var express = require("express");
var router = express.Router();
var axios = require("axios");
var Combo = require("../models/combo");
var Mood = require("../models/mood");
var Food = require("../models/recipe");

const jwt = require("jwt-simple");
const passport = require("passport");
const config = require("../config");

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
});

const movieFind = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "f04b2a25baed952b84af0eb4623bbc55",
    inlude_adult: false
  }
});

// add a movie to a combo
router.post(
  "/movie/:id",
  passport.authenticate("jwt", config.jwtSession),

  function(req, res) {
    movieFind.get(`/movie/${req.params.id}/keywords`).then(movieFound => {
      res.json(movieFound.data);
      // console.log(movieFound.data);
      movieFind.get(`/movie/${movieFound.data.id}`).then(movieObject => {
        // console.log(movieObject.data);
        const newCombo = {
          creator: req.user.id,
          movie: movieObject.data
        };
        Combo.create(newCombo);

        let combo = newCombo;
        let user = req.user.id;
        // for (i in movieFound.data.keywords) {
        let keywords = movieFound.data.keywords;
        console.log(keywords.name);

        Mood.findOne(
          { keyWordMovie: { $in: { keywords } } },
          // { results: { $elemMatch: { $gte: 80, $lt: 85 } } }
          (req, response) => {
            console.log("this is the mood ==+> " + response);
            Food.find({ keyWords: response.keyWordMarmiton }, (req, res) => {
              let dish = { dish: res };
              Combo.findOneAndUpdate(combo, { $set: dish }, function(err, doc) {
                if (err) {
                  console.log("Something wrong when updating data!");
                }
              });
            });
          }
        );
        //  }
      });
    });
  }
);

// add a dish to the combo

router.post(
  "/dish/:id",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res) {
    Combo.create({
      creator: req.user.id,
      dish: req.params.id
    }).then(combo => {
      res.json(combo);
    });
  }
);

//

module.exports = router;
