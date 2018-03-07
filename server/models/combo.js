const mongoose = require("mongoose");
const Schema = mongoose.Schema;

comboSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  dish: Array,
  movie: Array,
  wine: String
});

var Combo = mongoose.model("Combo", comboSchema);

module.exports = Combo;
