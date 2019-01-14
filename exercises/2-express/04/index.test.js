const request = require('supertest');
const express = require('express');

const {app, route}  = require('./index');

describe('Route', function() {

  it('should add a route', function(done) {
    route(app, '/hello', (req, res) => res.send('Hello!'))
    request(app)
      .get('/hello')
      .expect(200, done);
  });

  it('should get 404', function(done) {
    route(app, '/hello', (req, res) => res.send('Hello!'))
    request(app)
      .get('/notfound')
      .expect(404, done);
  });

});
