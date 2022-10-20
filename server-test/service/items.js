const db = require('../models/index');
const Items = db.Items;

// newItemData = {id: 0, section_num: 0, content: '', index: 0}
const itemCreate = async (newItemData) => {
  try {
    await Items.create({
      section_num: newItemData.section_num,
      content: newItemData.content,
      index: newItemData.index,
    });
  } catch (e) {
    console.error(e);
  }
};

// deletedItem = {id: 0, section_num: 0, content: '', index: 0}
const itemDelete = async (deletedItem) => {
  await Items.destroy({
    where: {
      id: deletedItem.id
    }
  });
};

const itemRead = async () => {
  const itemAll = await Items.findAll({
    order: [['index', 'asc']]
  });
  return itemAll;
}

// updatedItems = [{content: '', section_num: 0, index: 0},{content: '', section_num: 0, index: 0}, ...]
const itemUpdate = async (updatedItems) => {
  const updateItem = async (updatedItems) => { await Promise.all(
    updatedItems.map((updatedItem) => Items.update(
      {index : updatedItem.index, section_num : updatedItem.section_num},
      {where: {id: updatedItem.id}}
    ))
    )
  }
  await updateItem(updatedItems);

};

module.exports = { itemDelete, itemRead, itemUpdate, itemCreate };