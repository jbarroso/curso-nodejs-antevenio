const mysql = require('mysql')

let connection;
//connection.end()

function createConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlroot',
    database: 'tokens'
  });
}

function findByToken(token, cb) {
  connection.query('SELECT url FROM tokens where token = ?', [token], (err, results, fields) => {
    if (err) {
      console.error(err)
    } else {
      cb(results[0].url);
    }
  });
}

function saveToken(token, url) {
  connection.query(
    'INSERT INTO tokens (token, url) VALUES (?, ?)',
    [token, url],
    (err, result) => {
      if (err) console.log(err);
    }
  )
}

function incrementVisit(token) {
  console.log('Increment...', token);
  connection.query(
    'update tokens set times = times+1 where token = ?',
    [token],
    (err, result) => {
      if (err) console.log(err);
    }
  )
}


function init(cb) {
  connection = createConnection();
  cb();
  //connection.end();
}

module.exports = { init, findByToken, saveToken, incrementVisit };
