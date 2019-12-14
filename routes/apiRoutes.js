var db = require("../models");
var md5 = require("blueimp-md5");

module.exports = function(app) {
  app.post("/api/tutors", function(req, res) {
    console.log(req.body);
    //insert into tutor table
    db.Tutor.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      location: req.body.location,
      skillLevel: req.body.skillLevel,
      description: req.body.description,
      grade: req.body.grade,
      photo: req.body.photo,
      AccountId: req.body.accountId
    }).then(function(dbTutor) {
      //req.body.subjects is the array of the subjects
      req.body.subjects.forEach(function(subjectItem) {
        //find subject id
        db.Subject.findOne({
          where: {
            name: subjectItem
          }
        }).then(function(dbSubject) {
          if (!dbSubject) {
            return res.status(400);
          } else {
            //insert into tutorsubject table
            db.TutorSubject.create({
              subjectId: dbSubject.id,
              tutorId: dbTutor.id
            }).then(function(TutorSubject) {
              return res.status(200).json(TutorSubject);
            });
          }
        });
      });
    });
  });

  //post account
  app.post("/api/accounts", function(req, res) {
    db.Account.create({
      username: req.body.username,
      password: md5(req.body.password),
      role: req.body.role,
      email: req.body.email
    }).then(function(dbAccount) {
      res.json({ accountId: dbAccount.id });
    });
  });

  //check if the username exists
  app.get("/api/accounts/:username", function(req, res) {
    db.Account.findAll({
      where: {
        username: req.params.username
      }
    }).then(function(dbAccount) {
      if (dbAccount.length !== 0) {
        res.json({ isDuplicate: true });
      } else {
        res.json({ isDuplicate: false });
      }
    });
  });
};
