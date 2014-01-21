/**
 * Created by svaithiyanathan on 1/16/14.
 */
'use strict';

module.exports = {

    isFunction: function (callback){
        return callback != undefined && callback.constructor === Function
    },

    loadAllFiles : function(dir, moduleDir){
        var fs = require('fs');
        var mocks = {};
        var files = fs.readdirSync(dir);
        for(var i = 0 ; i<files.length; i++){
            var name = files[i];
            mocks[name.substr(0,name.length-3)] = require(moduleDir + name.substr(0,name.length-3));
        }
        console.log('Available mocks:', mocks);
        return mocks;
    }
}