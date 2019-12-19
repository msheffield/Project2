require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// PassportJS
let passport = require('passport');
let session = require('express-session');

app.use(session({
  secret: 'tutors are awesome',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');


// Routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  //////To modify - temp code to insert default subject values
  if (syncOptions.force) {
    db.Subject.bulkCreate([
      { name: "Math" },
      { name: "English Reading" },
      { name: "English Writing" },
      { name: "Science"},
      { name: "ESL"},
      { name: "FSL"},
      { name: "Spanish"},
    ]).then(function () {
      console.log(db.Subject.findAll());
    });
  }
  ////////////////////////////////////////////
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
