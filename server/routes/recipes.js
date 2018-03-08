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
  let ingredientSplit = req.params.ingredient.split("+");
  const getScore = function(userIngredients, recipe) {
    let researchScore = 0;
    const iterate = function(arr) {
      for (let i = 0; i < arr.length; i++) {}
    };
    // console.log(ingredients.map(i => i.ingredients));

    for (
      let iUserIngredient = 0;
      iUserIngredient < userIngredients.length;
      iUserIngredient++
    ) {
      for (
        let iRecipeIngredient = 0;
        iRecipeIngredient < recipe.ingredients.length;
        iRecipeIngredient++
      ) {
        if (
          recipe.ingredients &&
          recipe.ingredients[iRecipeIngredient] &&
          recipe.ingredients[iRecipeIngredient].match(
            userIngredients[iUserIngredient].ingredients
          )
        ) {
          researchScore++;
        }
      }
    }
    return researchScore;
  };
  // };
  ingredientSplit.forEach(ingredient => {
    const regex = new RegExp(ingredient, "i");
    orResearch.push({ ingredients: regex });
  });

  console.log("orResearch: ", orResearch);
  Recipe.find({ $or: orResearch })
    .then(recipes => {
      for (let i = 0; i < recipes.length; i++) {
        recipes[i].score = getScore(orResearch, recipes[i]);
      }
      recipes.sort((a, b) => b.score - a.score);
      res.json(recipes);
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
