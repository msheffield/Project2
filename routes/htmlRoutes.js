var db = require("../models");
let isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app) {
  // Load index page
  app.get("/", isAuthenticated,  function(req, res) {
    res.render("index", {});
  });

  // Render Tutors search page

  app.get("/tutors", function(req, res) {
    db.Tutor.findAll({}).then(function(tutors) {
      res.render("some table name", {
        tutor: tutors
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      req.redirect('/');
    }
    res.render("login");
  });
};
