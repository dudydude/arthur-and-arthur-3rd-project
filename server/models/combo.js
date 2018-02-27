const mongoose = require("mongoose");
const Schema = mongoose.Schema;

comboSchema = new Schema({
  dish: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
  movie: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  wine: String
});

var Combo = mongoose.model("Combo", comboSchema);
