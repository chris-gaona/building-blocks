var request = require('supertest');
var app = require('./app');
var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

describe('Requests to the root path', function () {
    it('should return a 200 status code', function (done) {
       request(app)
           .get('/')
           .expect(200, done);
    });

    it('should return a HTML format', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/, done);
    });

    it('should return index file with cities', function (done) {
       request(app)
           .get('/')
           .expect(/cities/i, done);
    });
});

describe('Listing cities on /cities using GET ', function () {
    it('should return a 200 status code', function (done) {
        request(app)
            .get('/cities')
            .expect(200, done);
    });

    it('should return JSON format using GET', function (done) {
       request(app)
           .get('/cities')
           .expect('Content-Type', /json/, done);
    });

    it('should return initial cities using GET', function (done) {
        request(app)
            .get('/cities')
            .expect(JSON.stringify([]), done);
    });
});

describe('Creating new cities', function () {
    it('should return a 201 status code', function (done) {
        request(app)
            .post('/cities')
            .send('name=Springfield&description=where+the+simpsons+live')
            .expect(201, done);
    });

    it('should return city name', function (done) {
        request(app)
            .post('/cities')
            .send('name=Springfield&description=where+the+simpsons+live')
            .expect(/springfield/i, done);
    });

    it('should validate city name & description', function (done) {
        request(app)
            .post('/cities')
            .send('name=&description=')
            .expect(400, done);
    });
});

describe('Deleting cities', function () {
    before(function () {
        client.hset('cities', 'Banana', 'a tasty fruit');
    });

    after(function () {
        client.flushdb();
    });

    it('should return a 204 status code', function (done) {
       request(app)
           .delete('/cities/Banana')
           .expect(204, done);
    }) ;
});

