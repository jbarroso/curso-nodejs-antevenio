const { graphql } = require('graphql');
const { root, schema } = require('../src/api');

describe('Dice API', () => {

  it('should fail without all mandatory params', async () => {
    const query = '{ dice }';
    const result = await graphql(schema, query, root);
    expect(result.errors.length).toBe(2);
  });

  it('should fail without one mandatory param', (done) => {
    const query = '{ dice(numDice:1) }';
    graphql(schema, query, root).then((result) => {
      expect(result.errors.length).toBe(1);
      done();
    });
  });

  it('should return a list of numbers', (done) => {
    const query = '{ dice(numDice:2, numSides: 6) }';
    graphql(schema, query, root).then((result) => {
      const { data } = result;
      expect(Array.isArray(data.dice)).toBe(true);
      done();
    });
  });

  it('should return a list of numDice numbers', (done) => {
    const query = '{ dice(numDice:2, numSides: 6) }';
    graphql(schema, query, root).then((result) => {
      const { data } = result;
      expect(data.dice.length).toBe(2);
      done();
    });
  });

  it('should return a list of numDice numbers betwen numSides', (done) => {
    const query = '{ dice(numDice:2, numSides: 6) }';
    graphql(schema, query, root).then((result) => {
      const { data } = result;
      expect(data.dice[0]).toBeGreaterThan(0);
      expect(data.dice[0]).toBeLessThan(6);
      expect(data.dice[1]).toBeGreaterThan(0);
      expect(data.dice[1]).toBeLessThan(6);
      done();
    });
  });

});
