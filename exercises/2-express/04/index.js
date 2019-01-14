const express = require('express')
const app = express();

function route(app, path, fn) {
  app.use((req, res, next) => (req.url === path) ? fn(req, res) : next() );
}
if (require.main === module) {
  app.listen(3000)
} else {
  module.exports = {app , route};
}

