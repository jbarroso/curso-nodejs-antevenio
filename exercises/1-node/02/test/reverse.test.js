const { reverseString } = require('../src/utils.js')

describe('reverse(str)', () => {

  it('should not change a string with one char', () => {
    expect(reverseString('o')).toBe('o')
  })

  it('should change a string with some chars', () => {
    expect(reverseString('one')).toBe('eno')
  })

})
