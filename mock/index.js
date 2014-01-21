/**
 * Created by svaithiyanathan on 1/10/14.
 */

'use strict';

var index = require('./../server'),
    mock = require('./allmocks');

mock.init();

require('../common/service').performHttpRequest = function(endpoint, method, data, callback){
    var output = mock.makeFakeRequest(endpoint, method, data);
    callback(output);
}


