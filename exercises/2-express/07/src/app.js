const express = require('express')
const app = express();

module.exports = (services) => {

  const tokens = require('./tokens/router')(services);
  const users = require('./users/router')(services);

  app.use(express.json());

  app.use('/tokens', tokens.router);
  app.use('/users', tokens.priv, users.router);
  app.get('/private', tokens.priv, (req, res) => res.json({ hello: req.jwt.username }));

  function start() {
    return app.listen(3000);
  }

  return {app, start};
};
