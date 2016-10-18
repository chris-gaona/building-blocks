var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/cities', function (req, res) {
    var cities = ['Lotopia', 'Caspiana', 'Ingido'];
   res.json(cities);
});

module.exports = app;
