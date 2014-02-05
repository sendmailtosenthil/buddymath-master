/**
 * Created by svaithiyanathan on 1/16/14.
 */

/*

// cache-manager

var cache_manager = require('cache-manager');
var memory_cache = cache_manager.caching({store: 'memory', max: 100, ttl: 10*//*seconds*//*});



module.exports = {

    store: function (questions) {
        var self = this;
        console.log("storing in cache");
        for (i=0; i<questions.length;i++) {
            console.log("key", questions[i].id)
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
    },

    get: function(id, cb){
        memory_cache.get(id, function (err, result) {
            console.log("result",result, "key", id);
            if (err) { return cb(err); }
            else {
                console.log("data retrieved from Mem-cache");
                return cb(null, result);
            }
        })
    }
}*/

/*
// node-cache
var NodeCache = require('node-cache');
var myCache = new NodeCache( { stdTTL: 1000, checkperiod: 120 } );


module.exports = {

    store: function (questions) {
        var self = this;
        console.log("storing in cache");
        for (i=0; i<questions.length;i++) {
            console.log("key", questions[i].id)
            myCache.set(questions[i].id, questions[i], function( err, success ){
                if( !err && success ){
                    console.log( success );
                }
            })
        }
    },

    get: function(id, callback){
        console.log("Getting from mem_cache, key#",id);
        myCache.get( id, function( err, value ){
            console.log(err, value);
                callback(err, value[id]);
        });
    }
}*/


var NodeCache = require('memory-cache');



module.exports = {

    store: function (questions) {
        var self = this;
        console.log("storing in cache");
        for (i=0; i<questions.length;i++) {
            console.log("key", questions[i].id)
            NodeCache.put(questions[i].id, questions[i])
        }
    },
    get: function (key, work, cb) {
        data = NodeCache.get(key);
        if (!data) {
            work(function () {
                var work_args = Array.prototype.slice.call(arguments, 0);
                if (work_args[0]) { // assume first arg is an error
                    return cb(work_args[0]);
                }
                NodeCache.put(key, work_args[1]);
                cb.apply(null, work_args);
            })
        }else {
                return cb(null, data);
            }
        }
}
