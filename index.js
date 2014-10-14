var express = require('express');
var app = express();
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/assets'));
app.listen(3000);