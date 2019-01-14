const { buildSchema, graphql } = require('graphql');

const typeDefinition = `
  type RandomDie {
    roll(numRolls: Int!): [Int]
    bestOf(numRolls: Int!): Int
  }

  type Query {
    dice(numSides: Int = 6): RandomDie
  }
`;

class RandomDie {

  constructor(numSides) {
    this.numSides = numSides;
  }

  roll({numRolls}) {
    return getArrayOfNumbers(numRolls).map(
      () => getRandomInt(1, this.numSides)
    );
  }

  bestOf({numRolls}) {
    //return this.roll({numRolls}).reduce((acc, value) => (value > acc) ? value : acc, 1);
    return Math.max(...this.roll({numRolls}))
  }

}

const schema = buildSchema(typeDefinition);
const root = {
  dice: (args) => new RandomDie(args.numSides)
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * ((max + 1) - min)) + min;

const getArrayOfNumbers = (max) => Array.from(Array(max).keys())

module.exports = { root, schema };
