const express = require('express')
const app = express();

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const init = (req, res, next) => {
  res.locals.throws = res.locals.throws || [];
  next();
};
const throwDice = (req, res, next) => {
  res.locals.throws.push(getRandomInt(1, 7));
  next();
};
const show = (req, res, next) => {
  res.locals.throws.map((dice) => res.write(`${dice}\n`));
  res.end();
}

function getMids() {
  let mids = [];
  mids.push(init);

  for(let i=0; i<10; i++) {
    mids.push(throwDice);
  }
  mids.push(show);
  return mids;
}

app.use(getMids());
app.listen(3000)
