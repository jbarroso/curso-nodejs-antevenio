const {getArrayOfNumbers, asyncMap, asyncMapSeq} = require('../src/util.js')

describe('utils', () => {

  describe('getArrayOfNumbers', () => {
    it('should get an array of 5 numbers', () => {
      expect(getArrayOfNumbers(5)).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe.only('asyncMap', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it.only('shold get result and call every callback', (done) => {
      const list = [1,2],
        expectedList = [2,3],
        mockFn = jest.fn(
          (number, cb) => {
            setTimeout(() => cb(number+1), 10);
          }
        );
      asyncMap(
        list,
        mockFn,
        (result) => {
          expect(setTimeout).toHaveBeenCalledTimes(list.length);
          expect(mockFn.mock.calls.length).toBe(list.length);
          expect(result).toEqual(expectedList);
          done();
        }
      );
      jest.runAllTimers();
    });
  });

  describe('asyncMapSeq', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('shold get result and call every callback', (done) => {
      const list = [1,2],
        expectedList = [2, 3],
        mockFn = jest.fn(
          (number, cb) => {
            setTimeout(() => cb(number+1), 10);
            jest.runOnlyPendingTimers();
          }
        );
      asyncMapSeq(
        list,
        mockFn,
        (result) => {
          expect(setTimeout).toHaveBeenCalledTimes(list.length);
          expect(mockFn.mock.calls.length).toBe(list.length);
          expect(result).toEqual(expectedList);
          done();
        }
      );
    });
  });


});
