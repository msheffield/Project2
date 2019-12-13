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
        isNumeric: true,
        len: [10, 10]
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skillLevel: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 10
      }
    },
    description: {
      type: DataTypes.TEXT,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    photo: DataTypes.BLOB
  });
  Tutor.associate = function(models){
    Tutor.belongsTo(models.Account, {
      foreignKey: {
        allowNull: false
      }
    });
<<<<<<< HEAD
    Tutor.belongsToMany(models.Subject, {
      through: "TutorSubject",
      as: "subjects",
      foreignKey: "tutorId",
      otherKey: "subjectId"
    })
  }
=======
  };
>>>>>>> af568620619ed951286abfa750665338a3e63e3e
  return Tutor;
};
