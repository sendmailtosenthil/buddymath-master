/**
 * Created by vsubramaney on 1/29/14.
 */

var LocalStrategy = require('passport-local').Strategy;
var user = require('../controller/user')
var service = require('./../common/service');

module.exports = function (passport) {

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
    passport.serializeUser(function(user, done) {

        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        service.performHttpRequest('/users/'+id,'GET',{},function(err, user){
            console.log('got my res', err, user);
            if (!err) {
                // change on service code changes
                done(err, user);
            }
        })
    });

    // use local strategy
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function(username, password, done){
        user.authenticate(username, password, done)
    }));

}