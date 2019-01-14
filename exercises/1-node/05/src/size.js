const fs = require('fs');
const path = require('path');

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

function calculateSize(path, cb) {
  fs.stat(path, (err, stat) => {
    if (err) {
      console.log(err);
      return cb(0);
    }
    if (stat.isFile()) {
      return calculateFileSize(path, cb);
    }
    return calculateDirSize(path, cb);
  });
}

function calculateFileSize(path, cb) {
  fs.stat(path, (err, stat) => {
    if (err) { return cb(0); }
    return cb(stat.size);
  });
}

function calculateDirSize(dir, cb) {
  fs.readdir(dir, (err, fileNames) => {
    if (err) {
      console.log(err);
      return cb(0);
    }
    const files = fileNames.map(p => path.join(dir, p));

    asyncMap(files, calculateSize, (sizes) => {
      const total = sizes.reduce((acc, item) => acc + item, 0);
      console.log(dir, total);
      cb(total);
    });
  });
}

function bytesToMb(bytes) {
  return bytes / 1024 / 1024;
}

const size = (path, cb) => calculateSize(path, (totalBytes) => cb(bytesToMb(totalBytes)));

module.exports = { size };
