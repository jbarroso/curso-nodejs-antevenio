const jwt = require('jsonwebtoken');

module.exports = (services) => {

  const {users, SECRET} = services;

  function createToken(req, res) {
    const {username, password} = req.body;

    users.checkUser(username, password, (result) => (result) ?
      res.json({ token: jwt.sign({username}, SECRET) }) :
      res.json({ error: 'Invalid password' })
    );
  };

  return { createToken };
};
