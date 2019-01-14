const { buildSchema, graphql } = require('graphql');

// TODO: use ItemInput!
/*
input ItemInput {
  name: String!
  category: String!
  quantity: Int!
}
type Mutation {
  createItem(item: ItemInput): [Item]
  updateItem(id: ID!, item: ItemInput): [Item]
}
*/

const typeDefinition = `

  input ItemInput {
    name: String
    quantity: Int
    purchased: Boolean
  }

  type Item {
    id: ID
    name: String
    quantity: Int
    purchased: Boolean
  }

  type Mutation {
    addItem(name: String, quantity: Int): Item
    updateItem(id: ID, name: String, quantity: Int, purchased: Boolean): Item
    setAsPurchased(id: ID): Item
    removeItem(id: ID): Boolean
  }

  type Query {
    items(nameFilter: String, purchasedFilter: Boolean): [Item]
  }
`;
const schema = buildSchema(typeDefinition);

module.exports = (items) => {

  const queryResolver = {
    items:({nameFilter, purchasedFilter}) => items.getItems(nameFilter, purchasedFilter)
  };

  const mutationResolver = {
    addItem: async ({name, quantity}) => await items.addItem(name, quantity),
    updateItem: async (args) => await items.updateItem(args),
    removeItem: async ({id}) => await items.removeItem(id),
    setAsPurchased: async ({id}) => await items.setItemAsPurchased(id)
  };

  const root = {
    ...queryResolver,
    ...mutationResolver
  };

  return { root, schema };
}
