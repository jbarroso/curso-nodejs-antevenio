const mysql = require('mysql')
const config = require('./config')

function createConnection() {
  return mysql.createConnection(config.db);
}

module.exports = {
  createConnection
};
