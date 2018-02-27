const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  duration: String,
  actors: Array,
  genre: Array,
  userScore: Number,
  releaseDate: Date,
  trailer: String,
  director: String,
  synopsis: String,
  image: String,
  keyWords: Array
});

var Movie = mongoose.model("Movie", movieSchema);
