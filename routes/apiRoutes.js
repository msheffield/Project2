var db = require("../models");

module.exports = function (app) {
  app.post("/api/tutors", function (req, res) {
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
    }).then(function (dbTutor) {
      //req.body.subjects is the array of the subjects
      req.body.subjects.forEach(function (subjectItem) {
        //find subject id
        db.Subject.findOne({
          where:{
            name: subjectItem
          }
        }).then(function(dbSubject){
          if (!dbSubject){
            return res.status(400);
          } else {
            //insert into tutorsubject table
            db.TutorSubject.create({
              subjectId: dbSubject.id,
              tutorId: dbTutor.id
            }).then(function (dbTutorSubject) {
              return res.status(200).json(dbTutor);
            });
          }
        });
      });
    });
  });
};

