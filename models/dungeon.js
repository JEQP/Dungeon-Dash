const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DungeonSchema = new Schema({
  // put in as object type. needs JSON object, name, who created it, stats?
  map: {
      type: String,
      required: true
  },
  verified: {
      type: Boolean,
      required: true
  },
  title: {
      type: String
  },
  creator: {
      type: mongoose.ObjectId,
      required: true
  },
  stats: {
      type: String,
      required: true
  } 
});

const Dungeon = mongoose.model("Dungeon", DungeonSchema);

module.exports = Dungeon;