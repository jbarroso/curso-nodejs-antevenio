module.exports = (services) => {

  const {users} = services;

  function createUser(req, res) {
    const {username, password} = req.body;
    users.createUser(username, password, (result) => (result) ?
      res.json(result) :
      res.json({ error: 'Error on user creation' })
    );
  };

  return { createUser };
};
