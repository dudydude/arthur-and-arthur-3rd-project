var express = require("express");
var router = express.Router();
var axios = require("axios");
var Combo = require("../models/combo");
var Mood = require("../models/mood");
var Food = require("../models/recipe");
var Keyword = require("../models/keywordsTmdb");

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
    inlude_adult: false,
    sort_by: "popularity.desc",
    page: 1
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
      console.log(movieFound.data);

      // je récupère l'objet du film avec toutes ses infos

      movieFind.get(`/movie/${movieFound.data.id}`).then(movieObject => {
        const newCombo = {
          creator: req.user.id,
          movie: movieObject.data
        };

        //je crée une nouvel entrée dans la collection combo (avec l'id du user + l'objet film)

        Combo.create(newCombo);

        var combo = newCombo;
        var user = req.user.id;

        // je stock les keywords du moovie dans une array

        var keywords = [];
        for (var i = 0; i < movieFound.data.keywords.length; i++) {
          keywords.push(movieFound.data.keywords[i].name);
        }
        console.log("this is movie keywords ===>" + keywords);
        // j'utilise l'array pour trouver des moods contenant les keywords

        Mood.findOne({
          keyWordMovie: { $in: keywords }
        }).exec((err, users) => {
          if (err) {
            next(err);
          } else {
            // si pas d'erreur, je récupère les infos du mood (notamment les keywords Marmiton)
            var keywordsFood = users.keyWordMarmiton;
            console.log("this is the food keywords ===>" + keywordsFood);
            console.log(users);
            // je récupère les recettes qui contiennet ces keywords

            Food.find({
              keyWords: { $in: keywordsFood }
            }).exec((err, result) => {
              let dish = { dish: result };
              console.log(dish);
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
                  console.log("this is the combo + food   " + doc);
                  res.json(doc);
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
  "/recipes/:searchTitle",
  passport.authenticate("jwt", config.jwtSession),

  function(req, res) {
    service
      .get(`recipes/searchbytitle/${req.params.searchTitle}`)
      .then(recipeFound => {
        var recipeMatch = recipeFound.data[0];
        console.log("je suis curry ====>" + recipeMatch);
        const newCombo = {
          creator: req.user.id,
          dish: recipeMatch
        };

        //je crée une nouvel entrée dans la collection combo (avec l'id du user + l'objet film)

        Combo.create(newCombo);

        var combo = newCombo;
        var user = req.user.id;

        Mood.find({
          keyWordMarmiton: { $in: recipeMatch.keyWords }
        }).exec((err, result) => {
          if (err) {
            console.error(err);
          }
          console.log("je match ==+> " + result);
          let keyWordsMovie = result[0].keyWordMovie;
          console.log("voici les keywords a utilisé   ====> " + keyWordsMovie);
          // find the id of the keywords movie in the mood collection
          Keyword.find({ name: keyWordsMovie }).exec((err, result) => {
            if (err) {
              console.log("je suis erreur");
              console.error(err);
            } else {
              var resultKeyword = [];

              for (i in result) {
                resultKeyword.push(result[i].id);
                console.log(resultKeyword);
              }
              // call the api tmdb to fetch movie that match the keywords              // et je les join en utilisant le séparateur de l'API, puis je lance la recherche
              // let keywordQuery = resultKeyword.join("%2C%20");

              // method join('|') same as OR
              let keywordQuery = resultKeyword.join("%20%7C%20");

              movieFind
                .get("discover/movie?&with_keywords=" + keywordQuery)
                .then(listOfMovies => {
                  console.log(listOfMovies.data);
                  if (err) {
                    console.error(err);
                  } else {
                    // save it to the combo
                    Combo.findOneAndUpdate(
                      combo,
                      { $set: { movie: listOfMovies.data.results } },
                      function(err, doc) {
                        if (err) {
                          console.log("Something wrong when updating data!");
                        }
                        // console.log("this is the combo + food   " + doc);
                        // console.log(doc.movie);
                        res.json(doc);
                      }
                    );
                  }
                });
            }
          });
        });
      });

    console.log("hello");
  }
);

//

module.exports = router;
