const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  friends: [],
  dungeonsPlayed: [],
  results: [0,0],
  dungeons: [{
    type: Schema.Types.ObjectId,
    ref: "Dungeon"
  }]
});
module.exports = User = mongoose.model("users", UserSchema);