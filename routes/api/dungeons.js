const express = require("express");
const router = express.Router();

const Dungeon = require("../../models/Dungeon");

const aggregate = Dungeon.aggregate([
    {$sample: { size:1 }}
  ]);
  


router.post("/create", (req, res) => {
    const newDungeon = new Dungeon({
        dungeonMap: req.body.dungeonMap,
        verified: req.body.verified,
        title: req.body.title,
        creator: req.body.creator,
        stats: req.body.stats
    });
    newDungeon
        .save()
        .then(dungeon => res.json(dungeon))
        .catch(err => console.log("saving map error: ", err));
});



router.post("/randomMap", (req,res) => {
    console.log("Getting Random Map");
    Dungeon.aggregate([{$sample: { size:1 }}]).then(dungeon => {
         res.json(dungeon);
    }).catch(err => console.log(err));

})

module.exports = router;