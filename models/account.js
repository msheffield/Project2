module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 3
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    reserved1: DataTypes.TEXT
  });
  return Account;
};
