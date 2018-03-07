const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project3");
const Recipe = require("../models/recipe");
const foodAPIRaw = require("./foodDBRaw.json");

const whitespaceRE = /[\n\s]+/g;

const formatted = foodAPIRaw
  .filter(r => r.title && r.method && r.ingredients)
  .map(recipe => {
    const ingredients = recipe.ingredients
      .replace(whitespaceRE, " ")
      .trim()
      .split("- ");
    ingredients.splice(0, 1);

    return {
      title: recipe.title.replace(whitespaceRE, " ").trim(),
      method: recipe.method
        .replace(whitespaceRE, " ")
        .replace(".", ". ")
        .trim(),
      indication: recipe.ingredients
        .replace(whitespaceRE, " ")
        .trim()
        .split(" : ")
        .shift()
        .replace("Ingredients ", ""),
      ingredients: ingredients.slice(0, ingredients.length / 2),
      ingredientsUSA: ingredients.slice(ingredients.length / 2),
      cookingTime: recipe.cookingTime.replace(whitespaceRE, " ").trim(),
      keyWords: recipe.keyWords
        .replace(whitespaceRE, " ")
        .trim()
        .split(" - ")
    };
  });

Recipe.create(formatted, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach(recipe => {
    console.log(recipe.keyWords);
  });
  mongoose.connection.close();
});
