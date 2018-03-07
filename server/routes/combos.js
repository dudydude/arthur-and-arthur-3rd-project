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
      // je récupère les keywords liés au film choisi
      res.json(movieFound.data);
      // je récupère l'objet du film avec toutes ses infos
      movieFind.get(`/movie/${movieFound.data.id}`).then(movieObject => {
        const newCombo = {
          creator: req.user.id,
          movie: movieObject.data
        };
        //je crée une nouvel entrée dans la collection combo (avec l'id du user + l'objet film)
        Combo.create(newCombo);

        let combo = newCombo;
        let user = req.user.id;

        // je stock les keywords du moovie dans une array
        var keywords = [];
        for (var i = 0; i < movieFound.data.keywords.length; i++) {
          //  console.log(movieFound.data.keywords[i].name);
          keywords.push(movieFound.data.keywords[i].name);
        }
        // j'utilise l'array pour trouver des moods contenant les keywords
        Mood.findOne({
          keyWordMovie: { $in: keywords }
        }).exec((err, users) => {
          if (err) {
            next(err);
          } else {
            // si pas d'erreur, je récupère les infos du mood (notamment les keywords Marmiton)
            var keywordsFood = users.keyWordMarmiton;
            // je récupère les recettes qui contiennet ces keywords
            Food.find({
              keyWords: keywordsFood
            }).exec((err, recipe) => {
              let dish = { dish: recipe };
              if (err) {
                console.error(err);
              } else {
                // retrouver le combo qui vient d'être créé et j'y ajoute les plats
                Combo.findOneAndUpdate(combo, { $set: dish }, function(
                  err,
                  doc
                ) {
                  if (err) {
                    console.log("Something wrong when updating data!");
                  }
                });
              }
            });
          }
        });
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
