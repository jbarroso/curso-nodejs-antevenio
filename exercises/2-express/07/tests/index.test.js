const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

const {createConnection } = require('../src/db');
const db = createConnection();

const users = require('../src/users/users')(db);
const tokens = require('../src/tokens/router')({users});
const {app, stop, start}  = require('../src/app')({users});

let server;
const username = 'jbarroso';
const password = 'mypassword';

beforeAll(() => {
  server = start(); // this is optional
});

afterAll((done) => {
  server.close(); // this is optional
  db.end(done)
});

describe('Tokens', function() {

  it.only('should get a token', function(done) {
    const expectedResponse = {
      token: jwt.sign({username}, tokens.SECRET)
    };

    users.checkUser = jest.fn((username, password, cb) => cb(true));
    request(app)
      .post('/tokens')
      .send({username, password})
      .expect(expectedResponse, done);
  });

  it('should get an invalid password', function(done) {
    const expectedResponse = {
      token: jwt.sign({username}, tokens.SECRET)
    };
    users.checkUser = jest.fn((username, password, cb) => cb(false));
    request(app)
      .post('/tokens')
      .send({username, password: 'foo'})
      .expect({ error: 'Invalid password'}, done);
  });

  it('should get private route when token is valid', function(done) {
    const token = jwt.sign({username}, tokens.SECRET);
    request(app)
      .get('/private')
      .set('Authorization', `Bearer ${token}`)
      .expect({ hello: username }, done);
  });

  it('should get private route when token is valid', function(done) {
    const token = 'foo';
    request(app)
      .get('/private')
      .set('Authorization', `Bearer ${token}`)
      .expect(401, done);
  });

});

describe('Users', function() {

  it('should not create a new user when token is not valid', function(done) {

    const token = 'foo';
    request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(401, done);
  });

});
