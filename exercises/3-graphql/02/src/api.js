const { buildSchema, graphql } = require('graphql');

const typeDefinition = `
  type Query {
    dice(numDice: Int!, numSides: Int!): [Int]
  }
`;
const schema = buildSchema(typeDefinition);
const root = {
  dice: ({numDice, numSides}) => getArrayOfNumbers(numDice).map(
    () => getRandomInt(1, numSides)
  )
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const getArrayOfNumbers = (max) => Array.from(Array(max).keys())

module.exports = { root, schema };
