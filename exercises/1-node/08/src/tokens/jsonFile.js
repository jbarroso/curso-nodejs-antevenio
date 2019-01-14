const fs = require('fs');

let urls = {};

const getUrlsFilePath = () => __dirname + '/../../data/urls.json';

function findByToken(token, cb) {
  return cb(urls[token]);
}

function saveToken(token, url) {
  urls[token] = url;
  const fileStream = fs.createWriteStream(getUrlsFilePath());
  fileStream.write(JSON.stringify(urls));
  fileStream.end();
}

function init(cb) {
  const fileStream = fs.createReadStream(getUrlsFilePath());
  let urlsData = '';
  fileStream.on('data', (data) => {
    urlsData = urlsData + data.toString();
  });
  fileStream.on('end', (err) => {
    if (err || !urlsData) { return cb(); }
    urls = JSON.parse(urlsData);
    cb();
  });
}

module.exports = { init, findByToken, saveToken };
