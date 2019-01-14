const { graphql } = require('graphql');
const { root, schema } = require('../src/api');

describe('Dice API', () => {

  describe('roll', () => {

    it('should return a list of numbers', (done) => {
      const query = '{ dice(numSides:6) { roll(numRolls: 2) } }';
      graphql(schema, query, root).then((result) => {
        const { data } = result;
        expect(Array.isArray(data.dice.roll)).toBe(true);
        done();
      });
    });

    it('should return a list of numRolls numbers', (done) => {
      const query = '{ dice(numSides:6) { roll(numRolls: 2) } }';
      graphql(schema, query, root).then((result) => {
        const { data } = result;
        expect(data.dice.roll.length).toBe(2);
        done();
      });
    });

    it('should return a list of numRolls numbers between numSides', (done) => {
      const query = '{ dice(numSides:6) { roll(numRolls: 2) } }';
      graphql(schema, query, root).then((result) => {
        const { data } = result;
        expect(data.dice.roll[0]).toBeGreaterThan(0);
        expect(data.dice.roll[0]).toBeLessThan(7);
        expect(data.dice.roll[1]).toBeGreaterThan(0);
        expect(data.dice.roll[1]).toBeLessThan(7);

        expect(data.dice.roll.length).toBe(2);
        done();
      });

    });

    it('should return a list of numRolls numbers between numSides when optional numSides', (done) => {
      const query = '{ dice { roll(numRolls: 2) } }';
      graphql(schema, query, root).then((result) => {
        const { data } = result;
        expect(data.dice.roll[0]).toBeGreaterThan(0);
        expect(data.dice.roll[0]).toBeLessThan(7);
        expect(data.dice.roll[1]).toBeGreaterThan(0);
        expect(data.dice.roll[1]).toBeLessThan(7);

        expect(data.dice.roll.length).toBe(2);
        done();
      });
    });

  });

  describe('bestOf', () => {

    it('should return a number', (done) => {
      const query = '{ dice { bestOf(numRolls: 100) } }';
      graphql(schema, query, root).then((result) => {
        const { data } = result;
        expect(typeof data.dice.bestOf).toBe('number');
        done();
      });
    });

    it('should return a number bigger than 3', (done) => {
      const query = '{ dice { bestOf(numRolls: 100) } }';
      graphql(schema, query, root).then((result) => {
        const { data } = result;
        expect(data.dice.bestOf).toBeGreaterThan(3);
        done();
      });
    });

    it('should return the highest number', (done) => {
      const query = '{ dice { bestOf(numRolls: 10000) } }';
      graphql(schema, query, root).then((result) => {
        const { data } = result;
        expect(data.dice.bestOf).toBe(6);
        done();
      });
    });

  });

});
