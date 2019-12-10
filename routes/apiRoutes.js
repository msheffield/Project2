var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  // Create a new account
  app.post("/api/account", function(req, res) {
    db.Post.create({
      role: req.body.role
    }).then(function(result) {
      res.json(result);
    });
  });

  // Create a new tutor
  app.post("/api/tutor", function(req, res) {
    db.Post.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      location: req.body.location,
      skillLevel: req.body.skillLevel,
      description: req.body.description,
      grade: req.body.grade
    }).then(function(result) {
      res.json(result);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(result) {
      res.json(result);
    });
  });
};
