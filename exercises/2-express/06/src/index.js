const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.use(express.urlencoded({extended: true}));

app.engine('.html', exphbs({defaultLayout: 'main', extname: '.html'}));
app.set('view engine', '.html');

app.get('/', (req, res) => {
  res.render('index');
});

let votes = {};

app.post('/', (req, res) => {
  const winner = req.body.winner;
  if (winner in votes) {
    votes[winner] ++;
  } else {
    votes[winner] = 1;
  }

  res.render('results', {votes});
});

if (require.main === module) {
  app.listen(3000);
} else {
  module.exports = {app};
}
