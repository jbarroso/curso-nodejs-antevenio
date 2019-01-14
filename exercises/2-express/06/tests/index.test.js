const request = require('supertest');
const express = require('express');

const {app}  = require('../src/index');

describe('Micro site', function() {

  it('should render a form', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('should vote', function(done) {
    request(app)
      .post('/')
      .send('winner=fry')
      .expect(200)
      .expect((res) => {
        expect(res.text).toMatch(/id=\"fry\">1<\/span>/);
      })
      .end(done);
  });

});
