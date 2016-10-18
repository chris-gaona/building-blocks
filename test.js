var request = require('supertest');
var app = require('./app');


describe('Requests to the root path', function () {
   it('should return a 200 status code', function (done) {
       request(app)
           .get('/')
           .expect(200)
           .end(function (err) {
               if (err) throw error;
               done();
           });
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
            .expect(JSON.stringify(['Lotopia', 'Caspiana', 'Ingido']), done);
    });
});

