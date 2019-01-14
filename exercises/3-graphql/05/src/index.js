const graphqlHTTP = require('express-graphql')
const app = require('express')()
//const items = require('src/items-memory');


const init = (items) => {
  const {root, schema} = require('./api')(items);
  app.use('/graphql', graphqlHTTP({ schema, rootValue: root , graphiql: true}))
  return app;
}

if (require.main === module) {
  init(require('src/items-memory'));
  app.listen(3000);
} else {
  module.exports = init;
}
