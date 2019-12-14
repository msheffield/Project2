module.exports = function(sequelize, DataTypes) {
  var TutorSubject = sequelize.define("TutorSubject", {
    tutorId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER
  });
  return TutorSubject;
};
