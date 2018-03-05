const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project3");
const Recipe = require("../models/recipe");
const foodAPIRaw = require("./foodDBRaw.json");

const whitespaceRE = /[\n\s]+/g;

const formatted = foodAPIRaw.filter(r => r.title && r.method).map(recipe => {
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
      .shift(),
    ingredients: ingredients,
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
    console.log(recipe.title);
  });
  mongoose.connection.close();
  console.log(formatted[0].keyWords);
});
