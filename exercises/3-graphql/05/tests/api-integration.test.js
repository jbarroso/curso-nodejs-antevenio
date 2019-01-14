const testApi = require('./api-base-test');
const itemsImpl = require('../src/items-mysql')();
const { root, schema } = require('../src/api')(itemsImpl);

describe('ShoppingCart API Integration Test', () => {
  testApi(itemsImpl, root, schema);
});
