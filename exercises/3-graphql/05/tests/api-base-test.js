const { graphql } = require('graphql');

module.exports = (itemsImpl, root, schema) => {

  async function getAllItems() {
    const query = '{ items { id, name, quantity, purchased }}';
    const result = await graphql(schema, query, root);
    return result.data.items;
  }

  async function addItem(name, quantity) {
    const query = `mutation { addItem(name: "${name}", quantity: ${quantity}) { id, name, quantity, purchased} }`;
    const result = await graphql(schema, query, root);
    return result.data.addItem;
  }

  describe('ShoppingCart API', () => {

    beforeEach(() => itemsImpl.removeAllItems());

    it('should get an empty items list', async () => {
      const items = await getAllItems();
      expect(items).toEqual([]);
    });

    it('should add an Item', async () => {
      const result = await addItem('foo', 1);
      const items = await getAllItems();
      const expectedItems = [
        {id: "1", name: "foo", quantity: 1, purchased: false }
      ];
      expect(items).toEqual(expectedItems);
    });

    it('should update an Item', async () => {
      await addItem('foo', 1);
      const query = 'mutation { updateItem(id: "1", name: "bar", quantity: 2, purchased: true) { id, name, quantity, purchased} }';
      const result = await graphql(schema, query, root);
      const items = await getAllItems();
      const expectedItems = [
        {id: "1", name: "bar", quantity: 2, purchased: true }
      ];
      expect(items).toEqual(expectedItems);
    });

    it('should partial update an Item', async () => {
      await addItem('foo', 1);
      const query = 'mutation { updateItem(id: "1", name: "bar") { id, name, quantity, purchased} }';
      const result = await graphql(schema, query, root);
      const items = await getAllItems();
      const expectedItems = [
        {id: "1", name: "bar", quantity: 1, purchased: false }
      ];
      expect(items).toEqual(expectedItems);
    });

    it('should remove an Item', async () => {
      await addItem('foo', 1);
      const query = 'mutation { removeItem(id: "1") }';
      const result = await graphql(schema, query, root);
      const items = await getAllItems();
      expect(items).toEqual([]);
      expect(result.data.removeItem).toBe(true);
    });

    it('should not remove an Item', async () => {
      await addItem('foo', 1);
      const query = 'mutation { removeItem(id: "3") }';
      const result = await graphql(schema, query, root);
      const items = await getAllItems();
      expect(items).toEqual(items);
      expect(result.data.removeItem).toBe(false);
    });

    it('should set as purchased', async () => {
      await addItem('foo', 1);
      const query = 'mutation { setAsPurchased(id: "1") { id, name, quantity, purchased} }';
      const result = await graphql(schema, query, root);
      const items = await getAllItems();
      const expectedItems = [
        {id: "1", name: "foo", quantity: 1, purchased: true }
      ];
      expect(items).toEqual(expectedItems);
    });

    it('should get items filterd by name', async () => {
      await addItem('foo', 1);
      await addItem('bar', 1);
      const query = '{ items(nameFilter: "foo") { id, name, quantity, purchased} }';
      const result = await graphql(schema, query, root);
      const expectedItems = [
        {id: "1", name: "foo", quantity: 1, purchased: false }
      ];
      expect(result.data.items).toEqual(expectedItems);
    });

    it('should get items filterd by purchased', async () => {
      await addItem('foo', 1);
      await addItem('bar', 1);
      const queryMutation = 'mutation { setAsPurchased(id: "2") { id, name, quantity, purchased} }';
      await graphql(schema, queryMutation, root);
      const query = '{ items(purchasedFilter: true) { id, name, quantity, purchased} }';
      const result = await graphql(schema, query, root);
      const expectedItems = [
        {id: "2", name: "bar", quantity: 1, purchased: true }
      ];
      expect(result.data.items).toEqual(expectedItems);
    });

  });

};
