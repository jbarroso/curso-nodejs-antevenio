const { reverseString } = require('../src/utils.js')

describe('reverse(str)', () => {
  it('should not change a string with one char', () => {
    expect(reverseString('o')).toBe('o')
  })
})
