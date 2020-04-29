const router = require("express").Router();
const userRoutes = require("./users");
const dungeonRoutes = require("./dungeons");

//User routes
router.use("/users", userRoutes);
router.use("/dungeons", dungeonRoutes);

module.exports = router;
