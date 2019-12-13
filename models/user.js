// User model with encrypted password

let bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.beforeCreate(function(user, options) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(), null);
    });
    return User;
};