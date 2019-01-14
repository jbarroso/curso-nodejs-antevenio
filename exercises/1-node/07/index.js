const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const fileStream = fs.createReadStream(__filename);
  fileStream.pipe(res);
});

server.listen(3000);
console.log('* ready on http.//localhost:3000');
