module.exports = function(sequelize, DataTypes) {
  var Tutor = sequelize.define("Tutor", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skillLevel: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 10
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    photo: DataTypes.TEXT
  });
  Tutor.associate = function(models) {
    Tutor.belongsTo(models.Account);
    Tutor.belongsToMany(models.Subject, {
      through: "TutorSubject",
      foreignKey: "tutorId",
      otherKey: "subjectId"
    });
  };
  return Tutor;
};
