const testConfig = {
  db: {
    host: 'localhost',
    user: 'root',
    password: 'mysqlroot',
    database: 'node_users'
  }
};

const devConfig = {
  db: {
    host: 'localhost',
    user: 'root',
    password: 'mysqlroot',
    database: 'node_users'
  }
};

const productionConfig = {
  db: {
    host: 'localhost',
    user: 'root',
    password: 'mysqlroot',
    database: 'node_users'
  }
};

const selectConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'production': return productionConfig;
    case 'test': return testConfig;
    default: return devConfig;
  }
};

module.exports = selectConfig()
