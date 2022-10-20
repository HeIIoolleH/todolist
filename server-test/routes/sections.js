const express = require('express');

const router = express.Router();


// controller 불러오기
const { createSections, deleteSections, getSections, updateSections } = require('../controller/sections')



// socket 불러오기





// *********************************************
// ***********axios를 이용한 http 통신***********
// *********************************************

// api/v1/{서비스 - (경우에 따라 다름)}/테이블/:identifier/테이블/:identifier …
// res.body = section = {content: '', sectionNum: 0, index: 0}
router.get('/', async (req, res) => {
  const sections = await getSections();
  res.send({ sections: sections })
});

router.post('/', async (req, res) => {
  const createdSection = req.body;
  const sections = createSections(createdSection);
  res.send({ sections: sections })
});

router.put('/', async (req, res) => {
  const updatedSection = req.body;
  const sections = updateSections(updatedSection);
  res.send({ sections: sections })
});

router.delete('/', async (req, res) => {
  const deletedSection = req.body;
  const sections = deleteSections(deletedSection);
  res.send({ sections: sections })
});



// ***********************************************************
// ************socket.io를 이용한 websocket 통신***************
// ***********************************************************



module.exports = router;