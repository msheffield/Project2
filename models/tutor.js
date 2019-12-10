module.exports = function(sequelize, DataTypes) {
  var Tutor = sequelize.define("Tutor", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    location: DataTypes.STRING,
    skillLevel: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    grade: DataTypes.INTEGER,
  });
  Tutor.associate = function(models){
    Tutor.belongsTo(models.Account, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Tutor;
};
