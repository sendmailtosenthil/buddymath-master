/**
 * Created by svaithiyanathan on 1/17/14.
 */

var db = require('./../memory/inMemory');
var service = require('./../common/service');
var cache = require('./../memory/inMemory')


/*module.exports = {

    allRoutes: [{
        path:'/',
        action: retrieveQuestions
    }]
}*/

function getProblems(callback){
    service.performHttpRequest('/problems/poll/10','GET',{pageNo:0},function(err, data){
        //console.log('got my res', err, data);
        if (!err) {
            // change on service code changes
            cache.store(data);
            callback(data[0]);
        }
    })
}

function getProblemById(id, callback)
{
    cache.get(id, function(result) {
        if (result) {
            console.log("result -", result);
            callback(result);
        } else
            {
                console.log("unable to get the data for id#",id);
                return callback(null);
            }
    })
}

function getProblem(id, objectId, callback){

    console.log("type of Id - ",typeof(id), "id - ", id);
    if ((typeof(id) == 'undefined') || (id == 0)) {
        console.log("polling 10 records!")
        service.performHttpRequest('/problems/poll/10','GET',{pageNo:0},function(err, data){
            //console.log('got my res', err, data);
            if (!err) {
                // change on service code changes
                cache.store(data);
                callback(data[0]);
            }
        })
    } else {
        console.log("trying to get the record from cache for id#",id);
        cache.get(id, function(rest){
            console.log("talking to server for getting data based on objectId");
            service.performHttpRequest('/problems/'+objectId,'GET',{},function(err, data){
                 //   console.log('got my res', err, data);
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

exports.retrieveQuestions = function(req, res){
    var objectId = "";
    getProblem("0", objectId, function(data){
        res.json(data);
    });
}

exports.evaluateProblem = function(req, res) {
    console.log("inside evaluateProblem", req.body);

    var currentPorblemId = req.body.id;
    var submittedAns = req.body.answer;
    var objectId = req.body.objectId;
    console.log("currentPorblemId -",currentPorblemId);

    getProblemById(currentPorblemId, function(currentProblem){
        console.log("currentprblm -", currentProblem);
        if(currentProblem) {
            if (currentProblem.correct == submittedAns) {
                var nextId = parseInt(currentPorblemId, 0)+1;
                getProblemById(nextId, function(nextProblem){
                    if (nextProblem) {
                        res.json(nextProblem);
                    } else {
                        console.log("unable to retreive next problem");
                    }
                })
            } else {
                res.json(currentProblem);
            }
        } else {
            console.log("unable to retrieve current problem");
        }
    })

    /*
    getProblem(currentPorblemId, objectId, function (currentProblem) {
        console.log("correct Ans -",currentProblem.correct);
        if (currentProblem.correct == submittedAns) {
            console.log("correct answer");
            var nextId = parseInt(currentPorblemId, 0)+1;
            console.log("nextId - ",nextId)
            getProblem(nextId, objectId, function(data){
                console.log("rendering problemNo",data.id);
                res.json(data);
            })
        } else {
            console.log("rendering same problem");
            res.json(currentProblem);
        }

    })*/


}