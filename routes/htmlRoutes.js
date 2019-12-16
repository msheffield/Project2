var db = require("../models");
let isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function (app) {
  app.get('/', isAuthenticated, function (req, res) {
    res.redirect('/index');
  })

  app.get("/index", function(req, res){
    res.render("index.handlebars");
  });

  app.post("/tutors", function (req, res) {
    //use raw sql to join three tables
    console.log(req.body);
    var condition = "";
    if (req.body.grade != 0){
      condition += " t.grade = " + req.body.grade;
    }
    if (req.body.skillLevel != 0){
      condition += " t.skillLevel = " + req.body.skillLevel;
    }
    if (req.body.location != 0){
      condition += " t.location = " + req.body.location;
    }

    var sql = "SELECT t.firstName, t.lastName, t.grade, t.location, t.skillLevel, t.phoneNumber, t.photo, t.description, s.name";
    sql += " FROM Tutors AS t";
    sql += " INNER JOIN TutorSubjects";
    sql += " ON t.id = TutorSubjects.tutorId";
    sql += " INNER JOIN Subjects AS s";
    sql += " ON TutorSubjects.subjectId = s.id";
    sql += (condition.trim() === "")? ";" : " WHERE " + condition + ";";

    console.log(sql);
    db.sequelize.query(sql).then(function(dbTutorData){
      console.log(dbTutorData);
      res.status(200).end();
      //build return object array and render tutor-block.handlebars
    });

    // db.Tutor.findAll({
    //   where: req.body.tutorQuery,
    //   include: [{
    //     model: db.Subject,
    //     attributes: ["name"],
    //     where: req.body.subjectQuery
    //   }]
    // }).then(function (data) {
    //   res.render("partials/tutor-block.handlebars");
    // })
  });


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


  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      req.redirect('/');
    }
    res.render("login");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });


};
