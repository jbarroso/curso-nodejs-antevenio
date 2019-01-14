const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min;

module.exports = (n, cb) =>
  setTimeout(() => cb(getRandomInt(1, n)), 100);
