const crypto = require('crypto');
const { getStorage } = require('./tokens/factory');

let storage;

const createToken = (url) => {
  const token = md5(url);
  save(token, url);
  return token;
}

function save(token, url) {
  storage.saveToken(token, decodeURIComponent(url));
};

function init(storageType, cb) {
  storage = getStorage(storageType);
  storage.init(cb);
}

function resolveToken(token, cb) {
  storage.findByToken(token, (result) => {
    cb(result);
    storage.incrementVisit(token);
  });
}

const md5 = (string) => crypto.createHash('md5').update(string).digest('hex');

module.exports = { init, createToken, resolveToken };
