module.exports = function(sequelize, DataTypes) {
    var Subject = sequelize.define("Subject", {
      name: DataTypes.STRING
    });
    return Subject;
  };