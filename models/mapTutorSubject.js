module.exports = function(sequelize, DataTypes) {
    var MapTutorSubject = sequelize.define("MapTutorSubject", {
      tutorId: DataTypes.INTEGER,
      subjectId: DataTypes.INTEGER
    });
    return MapTutorSubject;
  };