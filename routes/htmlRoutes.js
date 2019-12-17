var db = require("../models");
let isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app) {
  app.get('/', isAuthenticated.authLogin, function(req, res) {
    res.redirect('/index');
  })

  app.get("/tutors/:grade/:skillLevel/:location/:subject", function (req, res) {
    //use raw sql to join three tables

    console.log(req.params.subject);
    var hbsObject;
    var condition = "";
    if (req.params.grade != 0){
      condition += " t.grade = " + req.params.grade + " AND";
    }
    if (req.params.skillLevel != 0){
      condition += " t.skillLevel = " + req.params.skillLevel + " AND";
    }
    if (req.params.location != 0){
      condition += " t.location = " + req.params.location + " AND";
    }
    if (req.params.subject !== "[]"){
      let subjects = req.params.subject.replace("[", "(").replace("]", ")");
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

    db.sequelize.query(sql).then(function(dbResult){
      //build return object array and render tutor-block.handlebars
      // var tutorsObj = {};
      console.log(dbResult[0]);
      var dbTutorData = dbResult[0];
       var tutors = [];
      // aggregate data by tutor id
      for (var i = 0; i < dbTutorData.length; i++){
        // var tutorId = dbTutorData[i].id;
        // if (!(tutorId in tutorsObj)){
        //   tutorsObj[tutorId] = dbTutorData[i];
        //   tutorsObj[tutorId].subjectName = [];
        // }
        // console.log("dbTutorData[" + i + "] = " + dbTutorData[i]);
        // tutorsObj[tutorId].subjectName.push(dbTutorData[i].name.toString());
        console.log(dbTutorData[i]);
        tutors.push({
          photo: dbTutorData[i].photo,
          lastName: dbTutorData[i].lastName,
          firstName: dbTutorData[i].firstName,
          description: dbTutorData[i].description,
            skillLevel: dbTutorData[i].skillLevel,
            phoneNumber: dbTutorData[i].phoneNumber
        });
      }
    
    // for (var prop in tutorsObj){
    //   tutors.push(tutorsObj[prop]);
    // }
    console.log(tutors);
      
    //using html as i CANNOT get handlebar work here
   
    hbsObject = {
      tutors: tutors
    };
      
      //res.json(dbTutorData[0]);
      console.log("/tutor rendering");
      res.json(tutors);
    });

  });

  app.get("/index", function(req, res) {
    if (req.session.user || req.user) {
      db.Tutor.findAll({}).then(function (data) {
        let renderObj = {
          tutors: data
        };
        console.log("/index rendering");
        res.render("index", renderObj);
      });
    } else {
      res.redirect("login");
    }
  });

  // Load create tutor page
  app.get("/create-tutor", function (req, res) {
    console.log("getting all subjects");
    db.Subject.findAll({}).then(function (data) {
      let renderObj = {
        subjects: data
      };
      res.render("createTutor", renderObj);
    });
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
