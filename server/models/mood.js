const mongoose = require("mongoose");
const Schema = mongoose.Schema;

moodSchema = new Schema({
  name: String,
  keyWordMovie: Array,
  keyWordMarmiton: Array
});

var Mood = mongoose.model("Mood", moodSchema);

module.exports = Mood;
