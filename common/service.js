/**
 * Created by svaithiyanathan on 1/16/14.
 */
var config = require('./config');
var http = require('http');
var querystring = require('querystring');

module.exports = {

    performHttpRequest : function(endpoint, method, data, success){
        var endpoint = 'http://'+config.restHost+':'+config.restPort+endpoint;
        var dataString = JSON.stringify(data);
        var headers = {};

        if (method == 'GET') {
            endpoint += '?' + querystring.stringify(data);
        }
        else {
            headers = {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length

            };
        }
        var options = {
            host: config.restHost,
            port: config.restPort,
            path: endpoint,
            method: method,
            headers: headers
        };

        var req = http.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf-8');

            var responseString = '';

            res.on('data', function(data) {
                responseString += data;
            });

            res.on('end', function() {
                console.log(responseString);
                var responseObject;
                var error = true;
                try {
                    responseObject = JSON.parse(responseString);
                    error = false;
                }
                catch (e) {
                    console.log('Error occured parsing Json after calling rest api. ' +e);
                }
                success(error, responseObject);

            });
        });

        req.on('error',function(error) {
            //connect error
            console.log('Error occured while calling rest api.\n ' +error);
            success(error,true);
        });

        req.write(dataString);
        req.end();
    }
}
