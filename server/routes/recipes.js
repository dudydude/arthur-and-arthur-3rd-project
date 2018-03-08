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
  let orResearch = [];
  let ingredientSplit = req.params.ingredient.split(" ");
  ingredientSplit.forEach(ingredient => {
    const regex = new RegExp(ingredient, "i");
    orResearch.push({ ingredients: regex });
  });
  Recipe.find({ $or: orResearch })
    .then(recipe => {
      res.json(recipe);
    })
    .catch(err => next(err));
});

// find recipes based on keywords
router.get("/searchbykeywords/:searchKeyWords", (req, res, next) => {
  console.log("keywords: ", req.params.searchKeyWords);
  const keyWords = req.params.searchKeyWords.split(",");
  let orResearch = [];
  keyWords.forEach(keyWord => {
    const regex = new RegExp(keyWord, "i");
    orResearch.push({ keyWords: regex });
  });
  console.log("orResearch: ", orResearch);
  Recipe.find({ $and: orResearch })
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
