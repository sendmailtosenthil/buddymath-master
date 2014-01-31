/**
 * Created by svaithiyanathan on 1/16/14.
 */
/*
var user = require('./../controller/user');
var fs = require('fs');

var defaultHome = {
    path: '/',
    action: user.home
}

module.exports = {

    allRoutes: function(){
        var routes = [];
        routes.push(defaultHome);
        var files = fs.readdirSync('./controller');
        files.forEach(function(file){
            var name = file.substr(0, file.length-3);
            var customRoutes = require('./../controller/'+name).allRoutes;
            if(customRoutes.constructor === Array){
                 customRoutes.forEach(function(customRoute){
                    routes.push({
                        path:'/'+name+(customRoute.path == '/' ? '' : customRoute.path),
                        action:customRoute.action
                    });
                });
            }
        });
        return routes;
   }
}*/

var user = require('./../controller/user');
var questions = require('./../controller/questions');
var auth = require('./../common/authorization')

var userAuth = [auth.requiresLogin, auth.user.hasAuthorization]

module.exports = function (app, passport) {
    app.get('/', user.login);
    app.get('/home', user.home);
    app.post('/user/authenticate', passport.authenticate('local', {
        failureRedirect: '/',
        failureFlash: true
    }), user.home)

    app.get('/questions', questions.retrieveQuestions)
    app.post('/questions', questions.retrieveQuestions)

    app.post('/evaluateQuestion', questions.evaluateProblem)
}