const express = require('express');

const router = express.Router();

// controller 불러오기
const { createItem, deleteItem, getItems, updateItem } = require('../controller/items');




// socket 불러오기



// *********************************************
// ***********axios를 이용한 http 통신***********
// *********************************************

// api/v1/{서비스 - (경우에 따라 다름)}/테이블/:identifier/테이블/:identifier …
router.get('/', async (req, res) => {
  const items = await getItems();
  //요청(req)으로 sectionNumber을 받아와서 넣어준다. 
  res.send({ items: items });
});

router.post('/', async (req, res) => {
  // req.body = createdItem = newItemData = {content: '', section_num: 0, index: 0}
  console.log(req);
  const createdItem = req.body;
  // console.log("12312312312312", createdItem);
  const items = await createItem(createdItem);
  res.send({ items: items });
});

router.put('/', async (req, res) => {
  // req.body = updatedItems = [{content: '', section_num: 0, index: 0},{content: '', section_num: 0, index: 0}, ...]
  const updatedItems = req.body;
  console.log(updatedItems);
  const items = await updateItem(updatedItems);
  res.send({ items: items });
});

router.delete('/', async (req, res) => {
  // req.body = deletedItem = {content: '', section_num: 0, index: 0}
  const deletedItem = req.body;
  console.log(deletedItem);

  const items = await deleteItem(deletedItem);
  res.send({ items: items });
});





module.exports = router;