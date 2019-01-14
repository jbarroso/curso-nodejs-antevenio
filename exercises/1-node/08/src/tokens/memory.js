let urls = {};

function findByToken(token, cb) {
  return cb(urls[token].url);
}

function saveToken(token, url) {
  urls[token] = {url, times: 0};
}

function init(cb) {
  cb();
}

function incrementVisit(token) {
  urls[token].times++;
}

module.exports = { init, findByToken, saveToken };
