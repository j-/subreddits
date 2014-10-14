var express = require('express');
var app = express();
app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/assets'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.listen(3000);