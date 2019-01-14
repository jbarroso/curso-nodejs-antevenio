const testApi = require('./api-base-test');
const itemsImpl = require('../src/items-memory')();
const { root, schema } = require('../src/api')(itemsImpl);

describe('ShoppingCart API Unit Test', () => {
  testApi(itemsImpl, root, schema);
});
