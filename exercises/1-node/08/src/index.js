const http = require('http');
const fs = require('fs');
const { parse } = require('url');
const { form, confirm } = require('./templates');
const { init, createToken, resolveToken } = require('./shortener');

const getURLFromBody = (body) => {
  return body.split('=')[1];
}

const start = () => {

  const server = http.createServer((req, res) => {
    const url = parse(req.url, true)
    switch(url.pathname) {
      case '/':
        res.end(form());
        break;
      case '/confirm':
        let body = [];
        req.on('data', (chunk) => {
          body.push(chunk);
        });
        req.on('end', () => {
          body = Buffer.concat(body).toString();
          const token = createToken(getURLFromBody(body));
          const shortedURL = `/r?t=${token}`;
          res.end(confirm(shortedURL));
        })
        break;
      case '/r':
        resolveToken(url.query.t, (result) => {
          res.writeHead(301, { 'Location': result });
          res.end();
        });
        break;
    }
  });

  server.listen(3000);

  console.log('* ready on http.//localhost:3000');
}


init('mysql', () => start());

