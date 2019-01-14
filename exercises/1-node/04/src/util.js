const getArrayOfNumbers = (max) => Array.from(Array(max).keys());


const initResults = (list) => list.map(() => 0);

const asyncMap = (list, fn, cb) => {
  let results = initResults(list), count = 0;
  list.map((item, idx) => {
    fn(item, (result) => {
      count++;
      results[idx] = result;
      if (count == list.length) {
        cb(results);
      }
    });
  });
}
  /*
const asyncMapSeqHelper = (list, fn, cb, results) => {
  const [head, ...tail] list;
  fn(head, (result) => {
    results.push(result);
    if (tail.length === 0) cb(results)
    else asyncMapSeqHelper(tail, fn, cb, results);
  });
}
*/

const asyncMapSeq = (list, fn, cb) => asyncMapSeqHelper(list.slice(), fn, cb, []);

module.exports = {getArrayOfNumbers, asyncMap, asyncMapSeq};
