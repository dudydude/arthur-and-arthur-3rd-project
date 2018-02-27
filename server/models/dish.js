const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  keywordsMarmiton: Array,
  name: String,
  photo: String,
  timeToCook: String,
  difficulty: String,
  preparation: [
    {
      step: String
    }
  ],
  ingredients: {
    text: String,
    img: String
  }
});

var Dish = mongoose.model("Dish", dishSchema);
