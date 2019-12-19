let db = require("../models");
let passport = require('passport');
var md5 = require("blueimp-md5");

module.exports = function(app) {
  app.post("/api/tutors", function(req, res) {
    console.log(JSON.stringify(req.session));
    console.log(req.body);
    //insert into tutor table
    var newTutor = JSON.parse(req.body["data"]);
    console.log("newTutor: " + newTutor);
    db.Tutor.create({
      firstName: newTutor.firstName,
      lastName: newTutor.lastName,
      phoneNumber: newTutor.phoneNumber,
      location: newTutor.location,
      skillLevel: newTutor.skillLevel,
      description: newTutor.description,
      grade: newTutor.grade,
      photo: newTutor.photo,
      AccountId: req.session.user.id
    }).then(function(dbTutor) {
      //req.body.subjects is the array of the subjects
      newTutor.subjects.forEach(function(subjectItem) {
        //find subject id
        db.Subject.findOne({
          where: {
            name: subjectItem
          }
        }).then(function(dbSubject) {
          if (!dbSubject) {
            return res.status(400).end();
          } else {
            //insert into tutorsubject table
            db.TutorSubject.create({
              subjectId: dbSubject.id,
              tutorId: dbTutor.id
            }).then(function(dbTutorSubject) {
              return res.status(200).end();
            });
          }
        });
      });
    });
  });

  //post account
  app.post("/api/accounts", function(req, res) {
    console.log("routing to create accounts");
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

  //get all subjects
  app.get("/api/subjects", function(req, res){
    console.log("get all subjects");
    db.Subject.findAll({}).then(function(data){
      res.json(data);
    });
  });

  // Login/signup routes
  app.post('/api/login', passport.authenticate('local', {successRedirect: '/index', failureRedirect: '/login'}));

  app.post('/api/signup', function(req, res) {
    let data = {
      role: req.body.role,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }
    db.Account.create(data).then(function(user){
      req.session.user = user.dataValues;
      res.redirect('/index');
    }).catch(function(error) {
      console.log(error)
      res.status(422).json(error.errors[0].message);
    });
  });

  app.get('logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

};
