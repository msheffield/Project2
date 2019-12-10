module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    role: DataTypes.INTEGER
  });
  return Account;
};