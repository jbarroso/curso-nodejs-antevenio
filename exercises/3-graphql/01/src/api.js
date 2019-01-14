const { buildSchema, graphql } = require('graphql');

const typeDefinition = `
  type Query {
    dice: Int
  }
`;
const schema = buildSchema(typeDefinition);
const root = {
  dice: () => getRandomInt(1, 6)
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

module.exports = { root, schema };
