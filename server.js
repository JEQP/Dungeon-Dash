const express = require("express");
const mongoose = require("mongoose");
// const mongojs = require("mongojs");
const bodyParser = require("body-parser");
const routes = require("./routes");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();
const PORT = process.env.PORT || 5000;

// Define middleware here
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
// app.use(routes);

const db = require("./client/src/config/keys").mongoURI;



// Connect to the Mongo DB
mongoose.connect(
  db,
  { useNewUrlParser: true }
)
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./client/src/config/passport")(passport);
// Routes
app.use("/api/users", users);

// Start the API server
app.listen(PORT, function() {
  console.log(`Now listening on PORT ${PORT}!`);
});
