let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let db = require('../models');

// Use local strategy for authentication
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done) {
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser) {
            if (!dbUser || !dbUser.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect email or password'
                });
            }
        });
    }
));

passport.serializeUser(function(user, cb){
    cb(null, user);
});

passport.deserializeUser(function(user, cb){
    cb(null, obj);
});

module.exports = passport;