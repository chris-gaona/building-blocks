var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('OK');
});

app.get('/cities', function (req, res) {
    var cities = ['Lotopia', 'Caspiana', 'Ingido'];
   res.json(cities);
});

module.exports = app;
