
module.exports = () => {

  let items = [];

  class Item {
    constructor(data) {
      Object.assign(this, data);
    }
  }

  function removeAllItems() {
    items = [];
  }

  function getItems(nameFilter, purchasedFilter) {
    let filteredItems = items;
    if (nameFilter) {
      filteredItems = filteredItems.filter(item => item.name === nameFilter);
    }
    if (purchasedFilter) {
      filteredItems = filteredItems.filter(item => item.purchased === purchasedFilter);
    }
    return filteredItems.map(item => new Item(item));
  }

  function addItem(name, quantity) {
    const id = (items.length + 1).toString();
    const purchased = false;
    const newItem = new Item({id, name, quantity, purchased});
    items.push(newItem);
    return newItem;
  }

  function findItemById(id) {
    return items.find(item => item.id === id)
  }

  function updateItem(args) {
    let item = findItemById(args.id);
    const {
      name = item.name,
      quantity = item.quantity,
      purchased = item.purchased
    } = args;
    Object.assign(item, {name, quantity, purchased});
    return item;
  }

  async function removeItem(id) {
    if (!findItemById(id)) {
      return new Promise(resolve => resolve(false));
    }
    items = items.filter(item => item.id !== id)
    return new Promise(resolve => resolve(true));
  }

  function setItemAsPurchased(id) {
    let item = findItemById(id);
    Object.assign(item, {purchased: true});
    return item;
  }

  return {
    Item,
    removeAllItems,
    getItems,
    addItem,
    updateItem,
    removeItem,
    setItemAsPurchased
  };
}

