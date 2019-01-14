const storages = {
  memory: require('./memory'),
  mysql: require('./mysql'),
  jsonFile: require('./jsonFile'),
};

const getStorage = (type) => storages[type];

module.exports = { getStorage };
