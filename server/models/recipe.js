const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  method: String,
  indication: String,
  ingredients: [String],
  ingredientsUSA: [String],
  cookingTime: String,
  keyWords: [String],
  picURL: String,
  url: String,
  score: Number
});

var Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
