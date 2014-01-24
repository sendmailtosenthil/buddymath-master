/**
 * Created by svaithiyanathan on 1/17/14.
 */

var db = require('./../memory/inMemory');
var service = require('./../common/service');
var cache = require('./../memory/inMemory')


module.exports = {

    allRoutes: [{
        path:'/',
        action: retrieveQuestions
    }]
}

function getProblem(id, callback){
    cache.get(id, function(rest){
        console.log('oooooi');
        service.performHttpRequest('/problems','GET',{},function(err, data){
                console.log('got my res', err, data);
                // change on service code changes
                rest(err, data);
            })
    }, function(error, data){
          if (error) {
              console.log("unable to retreive data"+error);
          } else {
              callback(data);
          }
    })
}

function retrieveQuestions(req, res){
    getProblem("1", function(data){
        res.send(data);
    });
}