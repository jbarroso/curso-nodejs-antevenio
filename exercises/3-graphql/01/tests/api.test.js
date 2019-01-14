const { graphql } = require('graphql');
const { root, schema } = require('../src/api');

describe('Dice API', () => {

  it('should return a number in the field dice', (done) => {
    const query = '{ dice }';
    graphql(schema, query, root).then((result) => {
      const { data } = result;
      expect(typeof data.dice).toBe('number');
      done();
    });
  });

  it('should return a number betwen 1 and 6 in the field dice', (done) => {
    const query = '{ dice }';
    graphql(schema, query, root).then((result) => {
      const { data } = result;
      expect(data.dice).toBeGreaterThan(0);
      expect(data.dice).toBeLessThan(6);
      done();
    });
  });

});
