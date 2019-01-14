const router = require('express').Router();

module.exports = (services) => {

  const controller = require('./controller')(services);
  router.post('/', controller.createUser);

  return { router };
};
