const express = require("express");
const router = express.Router();

const Dungeon = require("../../models/dungeon");

const aggregate = Dungeon.aggregate([
    { $sample: { size: 1 } }
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



router.post("/randomMap", (req, res) => {
    console.log("Getting Random Map");
    Dungeon.aggregate([{ $sample: { size: 1 } }]).then(dungeon => {
        res.json(dungeon);
    }).catch(err => console.log(err));

});

router.post("/updateMap", (req, res) => {
console.log("req: ", req.body.params);
    Dungeon.findOneAndUpdate({ _id: req.body.params.dungeonID }, { stats: req.body.params.newStats, difficulty: req.body.params.difficulty }, { new: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send('Succesfully saved.');
    });
});

router.post("/getDungeons", (req, res) => {
    console.log("getdungeons: ", req.body.params);
    Dungeon.find({creator: req.body.params.friendID})
    .then(dungeonList => {
            res.json(dungeonList);
        }).catch(err => console.log(err));
    });

module.exports = router;