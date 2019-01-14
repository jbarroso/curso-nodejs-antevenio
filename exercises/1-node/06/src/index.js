const {searchPath, flatten} = require('./searchPath');

const path = process.argv.pop();
const substring = process.argv.pop();

searchPath(substring, path, (matches) => {
  matches.map(match => console.log(match));
});
