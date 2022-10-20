const { itemDelete, itemRead, itemUpdate, itemCreate } = require('../service/items');
const db = require('../models/index');
const { Sequelize } = require('../models/index');
const Items = db.Items;
const Op = Sequelize.Op;

// newItemData = {id: 0, section_num: 0, content: '', index: 0}
const createItem = async (newItemData) => {
  await itemCreate(newItemData)
  const items = await itemRead();

  return items;
};


const getItems = async () => {
  const items = await itemRead();

  return items;
};


// updatedItems = [{content: '', section_num: 0, index: 0},{content: '', section_num: 0, index: 0}, ...]
const updateItem = async (updatedItems) => {
  
  await itemUpdate(updatedItems);
  const items = await itemRead();
  return items;
};


// deletedItem = {id: 0, section_num: 0, content: '', index: 0}
const deleteItem = async (deletedItem) => {
  await itemDelete(deletedItem);
  const changeIndexItems = await Items.findAll({
    where : {index : {[Op.gt] : deletedItem.index}}
  })
  changeIndexItems.map(item => {
    item.decrement({'index': 1})
  })

  const items = await itemRead();

  return items;
};


module.exports = { createItem, deleteItem, getItems, updateItem };