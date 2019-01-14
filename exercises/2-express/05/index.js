const express = require('express')
const app = express();

const PASSWORD = 's3cr3t';

app.get('/public', (req, res) => {
  res.send('Welcome');
});

const requireAuth = (req, res, next) =>
  (req.url.includes(PASSWORD)) ?  next() : res.status(401).send('Not Authorized');

app.get('/private', requireAuth, (req, res) => {
  res.send('Welcome');
});

if (require.main === module) {
  app.listen(3000);
} else {
  module.exports = {app};
}
