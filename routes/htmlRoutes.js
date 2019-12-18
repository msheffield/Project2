var db = require("../models");
let isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function (app) {
  app.get('/', isAuthenticated.authLogin, function (req, res) {
    res.redirect('/index');
  })

  app.get("/tutors/:grade/:skillLevel/:location/:subject", function (req, res) {
    //use raw sql to join three tables
    var condition = [];
    if (req.params.grade != 0) {
      condition.push(" t.grade = " + req.params.grade);
    }
    if (req.params.skillLevel != 0) {
      condition.push(" t.skillLevel = " + req.params.skillLevel);
    }
    if (req.params.location != 0) {
      condition.push(" t.location = " + req.params.location);
    }
    if (req.params.subject !== "[]") {
      let subjects = req.params.subject.replace("[", "(").replace("]", ")");
      condition.push(" s.name IN " + subjects);
    }

    console.log(condition);
    //remote s.name to group by the result
    var sql = "SELECT t.id, t.firstName, t.lastName, t.grade, t.location, t.skillLevel, t.phoneNumber, t.photo, t.description";
    sql += " FROM Tutors AS t";
    sql += " INNER JOIN TutorSubjects";
    sql += " ON t.id = TutorSubjects.tutorId";
    sql += " INNER JOIN Subjects AS s";
    sql += " ON TutorSubjects.subjectId = s.id";
    sql += (condition.length === 0) ? "" : " WHERE " + condition.join(" AND ");
    sql += " GROUP BY t.id;";

    console.log(sql);

    db.sequelize.query(sql).then(function (dbResult) {
      console.log(dbResult[0]);
      var dbTutorData = dbResult[0];
      var tutors = [];
      // aggregate data by tutor id
      for (var i = 0; i < dbTutorData.length; i++) {
        console.log(dbTutorData[i]);
        tutors.push({
          photo: dbTutorData[i].photo,
          lastName: dbTutorData[i].lastName,
          firstName: dbTutorData[i].firstName,
          description: dbTutorData[i].description,
          skillLevel: dbTutorData[i].skillLevel,
          phoneNumber: dbTutorData[i].phoneNumber,
          location: dbTutorData[i].location,
          grade: dbTutorData[i].grade
        });
      }
      console.log(tutors);
      res.render("tutor", {tutors: dbTutorData});
    });

  });

  app.get("/index", function (req, res) {
    if (req.session.user || req.user) {
      db.Subject.findAll({}).then(function(data){
        let renderObj = {
          subjects: data
        };
        res.render("partials/searchtutor", renderObj);
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

  app.get("/signup", function (req, res) {
    if (req.session.user || req.user) {
      res.redirect('/index');
    } else {
      res.render("signup");
    }
  });

  app.get("/login", function (req, res) {
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
