const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../client/src/config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/user.js");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  console.log("Checking post ");
  console.log("body", req.body);
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// Get UserID
router.post("/getUserID", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      console.log("user getuserID", user);
      res.json(user);
    } else {
      // this should probably be deleted
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
    }
  })
});

// Update User
router.post("/updatePlayer", (req, res) => {
  console.log("req: ", req.body.params);
  User.findOneAndUpdate({ _id: req.body.params.playerID }, { results: req.body.params.playerStats, dungeonsPlayed: req.body.params.dungeonsPlayed }, { new: true }, function (err, doc) {
    if (err) return res.send(500, { error: err });
    return res.send('Succesfully saved.');
  });
});



router.post("/updatePlayerFriendList", (req, res) => {
  console.log("req: ", req.body.params);
  User.findOneAndUpdate({ _id: req.body.params.playerID }, { friends: req.body.params.friends}, { new: true }, function (err, doc) {
    if (err) return res.send(500, { error: err });
    return res.send('Succesfully saved.');
  });
});

router.post("/getFriendByName", (req, res) => {
  console.log("req: ", req.body);
  User.findOne({ name: req.body.name }).then(friend => {
    if (friend) {
      console.log("friend found: ", friend);
      res.json(friend);
    } else {
      return res.status(404).json({ namenotfound: "Name not found" });
    }
  })
});

router.post("/getFriendByEmail", (req, res) => {
  console.log("req: ", req.body);
  User.findOne({ email: req.body.email }).then(friend => {
    if (friend) {
      console.log("friend found: ", friend);
      res.json(friend);
    } else {
      return res.status(404).json({ emainotfound: "Email not found" });
    }
  })
});

module.exports = router;