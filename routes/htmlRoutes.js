var db = require("../models");

module.exports = function(app) {
<<<<<<< HEAD
  // Load index page
  app.get("/", function(req, res) {
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
=======
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
>>>>>>> b10f0389cca50ae675ecb2f34de66753355fe363


};
