const {size} = require('../src/size.js')

describe('size', () => {

  it('should get a directory size', () => {
    const path = '/tmp';
    expectedSize = 100;
    expect(size(path)).toBe(expectedSize);
  });

});

