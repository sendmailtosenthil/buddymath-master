/**
 * Created by svaithiyanathan on 1/16/14.
 */
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


