const {size} = require('./size');

size(
  process.argv[2],
  (totalSize) => console.log(`Total: ${totalSize}Mb`)
);
