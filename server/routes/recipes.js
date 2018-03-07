const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project3");
const Recipe = require("../models/recipe");

// call api for a list of all the recipes
router.get("/searchAll", function(req, res, next) {
  Recipe.find(function(err, recipes) {
    if (err) return console.error(err);
    console.log(recipes);
    console.log("coucou");
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      next(err);
    });
});

// find recipes based on ingredients
router.get("/searchbyingredients/:ingredient", (req, res, next) => {
  const ingredientsToRegex = new RegExp(req.params.ingredient);
  Recipe.find({ ingredients: { $regex: ingredientsToRegex, $options: "i" } })
    .then(recipe => {
      res.json(recipe);
    })
    .catch(err => next(err));
});

// find recipes based on keywords
router.get("/searchbykeywords/:searchKeyWords", (req, res, next) => {
  const keywordToRegex = new RegExp(req.params.searchKeyWords);
  Recipe.find({ keyWords: { $regex: keywordToRegex, $options: "i" } })
    .then(recipe => {
      res.json(recipe);
    })
    .catch(err => next(err));
});

// find recipes based on keywords within the title
router.get("/searchbytitle/:searchTitle", (req, res, next) => {
  const titleToRegex = new RegExp(req.params.searchTitle);
  Recipe.find({ title: { $regex: titleToRegex, $options: "i" } })
    .then(recipe => {
      res.json(recipe);
    })
    .catch(err => next(err));
});

module.exports = router;
