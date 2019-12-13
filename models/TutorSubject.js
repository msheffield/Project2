<<<<<<< HEAD:models/TutorSubject.js
module.exports = function(sequelize, DataTypes) {
    var TutorSubject = sequelize.define("TutorSubject", {
      tutorId: DataTypes.INTEGER,
      subjectId: DataTypes.INTEGER
    });
    return TutorSubject;
  };
=======
module.exports = function (sequelize, DataTypes) {
  var MapTutorSubject = sequelize.define("MapTutorSubject", {});
  MapTutorSubject.associate = function (models) {
    MapTutorSubject.belongsTo(models.Subject, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  MapTutorSubject.associate = function (models) {
    MapTutorSubject.belongsTo(models.Tutor, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return MapTutorSubject;
};
>>>>>>> af568620619ed951286abfa750665338a3e63e3e:models/mapTutorSubject.js
