var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

var redis = require('redis');
var client = redis.createClient();

client.select((process.env.NODE_ENV || 'development').length);

app.get('/cities', function (req, res) {
    client.hkeys('cities', function (err, names) {
        if (err) throw err;
        res.json(names);
    });
});

app.post('/cities', urlencode, function (req, res) {
    var newCity = req.body;
    client.hset('cities', newCity.name, newCity.description, function (err) {
        if (err) throw err;
        res.status(201).json(newCity.name);
    });
});

module.exports = app;
