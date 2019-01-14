const mysql = require('mysql')
const config = require('../config')

module.exports = (db) => {

  function checkUser(username, password, cb) {
    try {
      tryToCheckUser(username, password, cb);
    } catch (e) {
      cb(false);
    }
  }

  function tryToCheckUser(username, password, cb) {
    db.query('SELECT username FROM users where username = ? and password = ?', [username, password], (err, results, fields) => {
      if (err) {
        console.error(err)
        cb(false);
      }
      cb(results && results[0] && results[0].username === username);
    });
  }

  return { checkUser };
};
