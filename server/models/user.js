const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  mail: String,
  password: String,
  recoSave: [{ type: Schema.Types.ObjectId, ref: "combo" }]
});

var User = mongoose.model("User", userSchema);
