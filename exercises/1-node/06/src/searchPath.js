const fs = require('fs');
const path = require('path');

//const flatten = (lists) => [].concat.apply([], lists);
const flatten = (lists) => [].concat(...lists);

const asyncMap = (list, fn, cb) => {
  let results = new Array(list.length), count = 0;
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

function searchPath(substring, path, cb) {
  fs.stat(path, (err, stat) => {
    if (err) {
      console.log(err);
      return cb([]);
    }
    if (stat.isFile()) {
      return searchFile(substring, path, cb);
    }
    return searchDirectory(substring, path, cb);
  });

}

function searchFile(substring, path, cb) {
  const fileStream = fs.createReadStream(path);
  let matches = [];
  fileStream.on('data', (data) => {
    const lines = data.toString().split('\n');
    // hacer un filter
    const currentMatches = lines.reduce((acc, line) => {
      if (line.includes(substring)) {
        acc.push(`${path}: ${line}`);
      }
      return acc;
    }, []);
    matches =[...matches, ...currentMatches];
  })
  fileStream.on('end', (err) => {
    cb(matches);

  })
  fileStream.on('error', (err) => {
    console.error(err)
  })

}

function searchDirectory(substring, dir, cb) {
  fs.readdir(dir, (err, fileNames) => {
    if (err) {
      return cb([]);
    }
    const files = fileNames.map(p => path.join(dir, p));
    asyncMap(files, (file, cb) => searchPath(substring, file, cb), (matches) => {
      cb(flatten(matches));
    });
  });

}

module.exports = { searchPath };

