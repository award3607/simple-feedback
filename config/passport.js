// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

var User = require('../models').user;

module.exports = function(passport, user) {
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('create-user', new LocalStrategy( {passReqToCallback: true},
        function(req, username, password, done) {
            User.findOne({ where: { username: username }}).then((user) => {
                if (user) {
                    return done(null, false, { message: 'Username not available.' });
                }
                else {
                    User.create(req.body)
                    .then(newUser => {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    passport.use('login', new LocalStrategy( {passReqToCallback: true},
        function(req, username, password, done) {
            
            var isValidPassword = function(dbPass, password) {
                return dbPass === password;
            }

            User.findOne( {where: { username: username }}).then(user => {
                if (!user) {
                    return done(null, false, {message: 'User does not exist'});
                }
                if(!isValidPassword(user.password, password)) {
                    return done(null, false, {message: 'Incorrect password'});
                }
                return done(null, user);
            }).catch(err => {
                console.log('Error:', err);
                return done(null, false, {message: 'Something went wrong with login'});
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done (null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null);
            }
        });
    });
}