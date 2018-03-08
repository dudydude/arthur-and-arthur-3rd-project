const mongoose = require("mongoose");
const Schema = mongoose.Schema;

moodSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  name: String,
  keyWordMovie: Array,
  keyWordMarmiton: Array
});

var Mood = mongoose.model("Mood", moodSchema);

module.exports = Mood;
