const mongoose = require("mongoose");
const Schema = mongoose.Schema;

keywordSchema = new Schema({
  id: String,
  name: String
});

var Keyword = mongoose.model("Keyword", keywordSchema);

module.exports = Keyword;
