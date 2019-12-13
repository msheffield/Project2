module.exports = function(sequelize, DataTypes) {
  //this table is read-only, data should be inserted by system only
  var Subject = sequelize.define("Subject", {
    name: {
      type: DataTypes.STRING
    }
  });
  return Subject;
};
