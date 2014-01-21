/**
 * Created by svaithiyanathan on 1/16/14.
 */
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
}