module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
    var Subject = sequelize.define("Subject", {
      name: DataTypes.STRING
    });
    Subject.associate = function(models){
      Subject.belongsToMany(models.Tutor, {
        through: "TutorSubject",
        as: "tutors",
        foreignKey: "subjectId",
        otherKey: "tutorId"
      });
    };
    return Subject;
  };
=======
  //this table is read-only, data should be inserted by system only
  var Subject = sequelize.define("Subject", {
    name: {
      type: DataTypes.STRING
    }
  });
  return Subject;
};
>>>>>>> af568620619ed951286abfa750665338a3e63e3e
