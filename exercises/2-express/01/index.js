const express = require('express')
const app = express();
app.use((req, res, next) => {
  Math.random() > .5 ? next() : res.send('Cara!')
})
app.use((req, res) => {
  res.send('Cruz!')
})
app.listen(3000)
