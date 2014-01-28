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

    if ((typeof(id) == 'undefined') || (id == 0)) {
        service.performHttpRequest('/problems/poll/10','GET',{pageNo:0},function(err, data){
            console.log('got my res', err, data);
            if (!err) {
                // change on service code changes
                cache.store(data);
                callback(data);
            }
        })
    } else {

        cache.get(id, function(rest){
            service.performHttpRequest('/problems/'+id,'GET',{pageNo:1},function(err, data){
                    console.log('got my res', err, data);
                    if (!err) {
                        // change on service code changes
                        rest(err, data);
                    }
                })
        }, function(error, data){
              if (error) {
                  console.log("unable to retreive data"+error);
              } else {
                  callback(data);
              }
        })
    }
}

function retrieveQuestions(req, res){
    getProblem("0", function(data){
        res.send(data);
    });
}