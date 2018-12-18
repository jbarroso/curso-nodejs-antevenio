function addAsync(a,b, cb) {
  setTimeout(() => cb(a + b), 100);
}

describe('addAsync', () => {
  it('should add', (done) => {
    addAsync(1, 2, (result) => {
      expect(result).toBe(3);
      done();
    });
  });
});
