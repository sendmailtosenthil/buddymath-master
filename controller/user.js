/**
 * Created by svaithiyanathan on 1/16/14.
 */

var fs = require('fs');
var service = require('./../common/service');

//module.exports = {

/*    allRoutes: [{
        path:'/',
        action: home
    }, {
        path:'/authenticate',
        action: authenticate
    }],

 home : home
}*/

module.exports.home = function(req, res){
    console.log("rendering home page")
    res.setHeader('Content-Type', 'text/html');
    res.render("index");
}

module.exports.login = function(req, res){
    console.log("rendering login page")
    res.setHeader('Content-Type', 'text/html');
    res.render("login");

}

module.exports.authenticate = function(username, password, done) {

    service.performHttpRequest('/user/authenticate','POST',{username:username, password:password},function(err, user){
        console.log('got my res', err, user);
        if (!err) {
            // change on service code changes
            return done(err, user);
        } else {
            return done(null, false, { message: 'Invalid password' })
        }
    })
}


