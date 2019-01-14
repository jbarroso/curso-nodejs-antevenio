const router = require('express').Router();
const jwt = require('jsonwebtoken');
const SECRET = 's3cr3t';

function priv(req, res, next) {
  const token = req.get('Authorization').match(/Bearer (.*)$/)[1]
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401)
    req.jwt = decoded
    next();
  })
}

module.exports = (services) => {
  const controller = require('./controller')({users: services.users, SECRET});
  router.post('/', controller.createToken);

  return { router, priv, SECRET };
};
