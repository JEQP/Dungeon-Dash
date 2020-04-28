const express = require("express");
const router = express.Router();

const Dungeon = require("../../models/Dungeon");

router.post("/create", (req, res) => {
    const newDungeon = new Dungeon({
        map: req.body.map,
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
module.exports = router;