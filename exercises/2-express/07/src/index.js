const app = require('./app');
const {createConnection } = require('./db');
const db = createConnection();

const services = {
  users: require('./users/users')(db);
};

app(services).start();
