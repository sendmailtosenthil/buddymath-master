/**
 * Created by svaithiyanathan on 1/17/14.
 */

var db = require('./../memory/inMemory');
var service = require('./../common/service');


module.exports = {

    allRoutes: [{
        path:'/',
        action: retrieveQuestions
    }]
}


function retrieveQuestions(req, res){
    service.performHttpRequest('/problems','GET',{},function(output){
        res.send(output);
    })
    //res.json();
}