/**
 * Created by svaithiyanathan on 1/16/14.
 */
/*
var utils = require('./../common/utils');

function InMemory(){
    this.data = {};
}

var inMem = new InMemory();

module.exports = {

    store: function (key, value, callback){
        inMem.data[key] = value;
        if(utils.isFunction(callback)) callback(key, value);
    },

    retrieve: function (key, callback){
        if(utils.isFunction(callback)){
            callback(inMem.data[key]);
        }else {
            return inMem.data[key];
        }
    },

    next: function (id){
        return inMem
    }
}
*/

var cache_manager = require('cache-manager');
var memory_cache = cache_manager.caching({store: 'memory', max: 100, ttl: 10/*seconds*/});


module.exports = {

    store: function (questions) {
        var self = this;
        for (i=0; i<questions.length;i++) {
            memory_cache.set(questions[i].id, questions[i], function(err) {
                if (err) {
                    console.log("unable to cache data");
                }
            })
        }
    },

    get: function(id, restServiceCallBack, cb) {
        memory_cache.wrap(id, restServiceCallBack ,function(error, result) {
            if (error){
                console.log("unable to get the data");
                return cb(error, null);
            }
            else {
                data = result;
                cb(null, data);
            }
        })
    }
}

