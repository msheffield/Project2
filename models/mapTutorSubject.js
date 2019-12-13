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
