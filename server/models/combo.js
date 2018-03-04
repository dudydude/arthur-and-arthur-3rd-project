const mongoose = require("mongoose");
const Schema = mongoose.Schema;

comboSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref:"User"}
  dish: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
  movie: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  wine: String
});

var Combo = mongoose.model("Combo", comboSchema);
