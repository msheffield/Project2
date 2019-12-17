var db = require("../models");
let isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app) {
  app.get('/', isAuthenticated.authLogin, function(req, res) {
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
      condition += " t.grade = " + req.body.grade + " AND";
    }
    if (req.body.skillLevel != 0){
      condition += " t.skillLevel = " + req.body.skillLevel + " AND";
    }
    if (req.body.location != 0){
      condition += " t.location = " + req.body.location + " AND";
    }
    if (req.body.subject !== "[]"){
      let subjects = req.body.subject.replace("[", "(").replace("]", ")");
      condition += " s.name IN " + subjects;
    }

    var sql = "SELECT t.id, t.firstName, t.lastName, t.grade, t.location, t.skillLevel, t.phoneNumber, t.photo, t.description, s.name";
    sql += " FROM Tutors AS t";
    sql += " INNER JOIN TutorSubjects";
    sql += " ON t.id = TutorSubjects.tutorId";
    sql += " INNER JOIN Subjects AS s";
    sql += " ON TutorSubjects.subjectId = s.id";
    sql += (condition.trim() === "")? ";" : " WHERE " + condition + ";";

    console.log(sql);

    db.sequelize.query(sql).then(function(dbTutorData){
      //build return object array and render tutor-block.handlebars
      var tutorsObj = {};
      console.log(dbTutorData);
      //aggregate data by tutor id
    //   for (var i = 0; i < dbTutorData.length; i++){
    //     var tutorId = dbTutorData[i].id;
    //     if (!(tutorId in tutorsObj)){
    //       tutorsObj[tutorId] = dbTutorData[i];
    //       tutorsObj[tutorId].subjectName = [];
    //     }
    //     console.log("dbTutorData[" + i + "] = " + dbTutorData[i]);
    //     tutorsObj[tutorId].subjectName.push(dbTutorData[i].name.toString());
    //   }
    //  var tutors = [];
    // for (var prop in tutorsObj){
    //   tutors.push(tutorsObj[prop]);
    // }
    // console.log(tutors);
      res.render("index",{
        tutors: dbTutorData
      });
      
    });
  });

  app.get("/index", function(req, res) {
    if (req.session.user || req.user) {
      res.redirect('/index');
    } else {
      res.redirect("login");
    }
  });

  app.get("/signup", function(req, res) {
    if (req.session.user || req.user) {
      res.redirect('/');
    } else {
      res.render("signup");
    }
  });

  app.get("/login", function(req, res) {
    if (req.session.user || req.user) {
      res.redirect('/');
    } else {
      res.render("login");
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
