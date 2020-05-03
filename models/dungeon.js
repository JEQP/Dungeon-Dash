const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DungeonSchema = new Schema({
  // put in as object type. needs JSON object, name, who created it, stats?
  dungeonMap: {
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
      required: true,
      index: true
  },
  stats: {
      type: Array,
      required: true
  },
  difficulty: {
      type: String,
      index: true
  } 
});

const Dungeon = mongoose.model("Dungeon", DungeonSchema);

module.exports = Dungeon;