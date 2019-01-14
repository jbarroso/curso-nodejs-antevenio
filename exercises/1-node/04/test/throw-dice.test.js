const throwDice = require('../src/throw-dice.js')

const getArrayOfNumbers = (max) => Array.from(Array(max).keys());

const asyncMap = (list, fn, cb) => {
  let results = [];
  list.map((item, idx) => {
    fn(item, (result) => {
      results.push({idx, result});
      if (results.length === list.length) {
        cb(results);
      }
    });
  });
}

const throwDiceDataProvider = () =>
  getArrayOfNumbers(2).map((n) => [n+1]);

describe.each(throwDiceDataProvider())(
  'throwDice',
  (n) => {
    test(`should return a value with ${n}`, (done) => {
      asyncMap(getArrayOfNumbers(1), throwDice, (results) => {
        results.map(({result}) => {
          expect(result).toBeGreaterThan(0);
          expect(result).toBeLessThan(n + 1);
        });
        done();
      });
    });
  }
);
