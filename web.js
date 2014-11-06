/**
 * used to open a local web server and run the pp
 */

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

app.use(function(req, res) {
    
        res.sendfile(__dirname + '/index.html');
});


app.listen(9000);