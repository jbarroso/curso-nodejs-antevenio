const request = require('supertest');

const itemsImpl = require('../src/items-memory')();
const app = require('../src/index')(itemsImpl);

describe('HTTP server', () => {

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should get an empty array', (done) => {
    request(app)
      .get('/graphql')
      .query({ query: '{items { name } }' })
      .expect(200, (err, response) => {
        expect(response.body.data.items).toEqual([]);
        done();
      });
  });

});
