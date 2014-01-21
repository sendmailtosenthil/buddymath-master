/**
 * Created by svaithiyanathan on 1/16/14.
 */
var fs      = require('fs');

module.exports = {

    allRoutes: [{
        path:'/',
        action: function(req, res){
            res.setHeader('Content-Type', 'text/html');
            res.send(fs.readFileSync('./index.html'));
        }
    }],

    home: function(req, res){
        res.setHeader('Content-Type', 'text/html');
        res.send(fs.readFileSync('./index.html'));
    }
}