const request = require('supertest');
const express = require('express');

const {app}  = require('./index');

describe('Express Route', function() {

  it('should get public route', function(done) {
    request(app)
      .get('/public')
      .expect(200, done);
  });

  it('should get private route', function(done) {
    request(app)
      .get('/private?s3cr3t')
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('should return 401 unauthorized', function(done) {
    request(app)
      .get('/private')
      .expect(401)
      .end(function(err, res) {
        done(err);
      });
  });
});
