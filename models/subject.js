module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define("Subject", {
    name: DataTypes.STRING
  });
  Subject.associate = function(models) {
    Subject.belongsToMany(models.Tutor, {
      through: "TutorSubject",
      foreignKey: "subjectId",
      otherKey: "tutorId"
    });
  };
  return Subject;
};
