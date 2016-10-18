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

