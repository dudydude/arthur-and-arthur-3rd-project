const recipes = require("./foodDBRaw.json");

const whitespaceRE = /[\n\s]+/g;

const formatted = recipes.filter(r => r.title && r.method).map(recipe => ({
  title: recipe.title.replace(whitespaceRE, ""),
  method: recipe.method.replace(whitespaceRE, " "),
  ingredients: recipe.ingredients.replace(whitespaceRE, " "),
  cookingTime: recipe.cookingTime.replace(whitespaceRE, " "),
  keyWords: recipe.keyWords.replace(whitespaceRE, " ")
}));

console.log(formatted);
