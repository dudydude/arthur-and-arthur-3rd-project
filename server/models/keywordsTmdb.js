const mongoose = require("mongoose");
const Schema = mongoose.Schema;

keywordSchema = new Schema({
  id: String,
  name: String
});

var Keywords = mongoose.model("Keywords", keywordsSchema);
