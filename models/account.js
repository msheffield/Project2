let bcrypt = require("bcryptjs");

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
    email: {
      type: DataTypes.STRING
    },
    reserved1: DataTypes.TEXT
  });

  Account.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  Account.beforeCreate(function (user, options) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(), null);
  });

  return Account;
};
