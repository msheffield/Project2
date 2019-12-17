var db = require("../models");
let isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app) {
  app.get('/', isAuthenticated.authLogin, function(req, res) {
    res.redirect('/index');
  })

  // // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });

  app.get("/index", function(req, res) {
    res.render("index");
  });

  app.get("/signup", function(req, res) {
    if (req.session.user || req.user) {
      res.redirect('/');
    }
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    if (req.session.user || req.user) {
      res.redirect('/');
    }
    res.render("login");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
