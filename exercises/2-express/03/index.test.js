const request = require('supertest');
const express = require('express');

const app = require('./index');

describe('Auth', function() {

  it('should be authenticated', function(done) {
    request(app)
      .get('/?sup3rs3cr3t')
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('should return 401 unauthorized', function(done) {
    request(app)
      .get('/')
      .expect(401)
      .end(function(err, res) {
        done(err);
      });
  });

});
