// express 설정
const express = require('express');
const app = express();

app.use(express.json());

// controller 불러오기
const { createItem, deleteItem, getItems, updateItem } = require('./controller/items');
const { createSections, deleteSections, getSections, updateSections } = require('./controller/sections')

// http 접속을 위한 cor 옵션 넣기
const cors = require('cors')

// cors 옵션 설정
const corsOptions = {
  origin: "*", // 출처 허용 옵션 - 전체 출처 허용
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));


// socket 설정 및 http통신->socket통신 
const http = require('http').Server(app);
const server = require('http').createServer(app)
const io = require('socket.io')(server);

// // router를 위한 socket통신 설정
// app.set('io', io);


// router 불러오기
const items = require('./routes/items');
const sections = require('./routes/sections');

app.use('/items', items);
app.use('/sections', sections);


// ***********************************************************
// ************socket.io를 이용한 websocket 통신***************
// ***********************************************************

app.get('/',function(req, res){
  res.send('소켓 서버 8002포트가 실행중입니다.');
});

io.on('connection', function (socket) {
  console.log(1234);

  socket.on('createItem', async (createdItem) => {
    console.log('createItem');
    // createdItem = newItemData = {content: '', section_num: 0, index: 0}
    const items = await createItem(createdItem);
    io.emit(`createItem`, items);
  })

  socket.on('updateItem', async (updatedItems) => {
    console.log('updateItem');
    // updatedItems = [{content: '', section_num: 0, index: 0},{content: '', section_num: 0, index: 0}, ...]
    const items = await updateItem(updatedItems);
    io.emit(`updateItem`, items);
  });

  socket.on('deleteItem', async (deletedItem) => {
    console.log('deleteItem');
    const items = await deleteItem(deletedItem);
    io.emit(`deleteItem`, items);
  })



  // section = {content: '', section_num: 0, index: 0}
  socket.on('createSections', async(createdSection) => {
    console.log('createSections');
    const sections = await createSections(createdSection);
    io.emit('createSections',sections);
  });
  
  socket.on('updateSections', async(updatedSection) => {
    console.log('updateSections');
    const sections = updateSections(updatedSection);
    io.emit('updateSections',sections);
  });
  
  socket.on('deleteSections', async(deletedSection) => {
    console.log('deleteSections');
    const sections = deleteSections(deletedSection);
    io.emit('deleteSections',sections);
  });

});

server.listen(8002, function () {
  console.log('listening on *:8002');
});

// const db = require('./models/index');

// const sequelize = db.sequelize;
// const Sections = db.Sections;
// const Items = db.Items;

// (async() => {
//   await sequelize.sync({ force: true});

//   const sectionSave = async(sectionData) =>{ 
//     await Sections.bulkCreate(sectionData);
//   }

//   const itemSave = async(itemData) => {
//     await Items.bulkCreate(itemData);
//   }

//   const sections = [
//     {name: 'To do', index: 1},
//     {name: 'Doing', index: 2},
//     {name: 'Done', index: 3},
//   ]

//   const items = [
//     {content: '할 일', section_num: 1, index: 1},
//     {content: 'Doing', section_num: 2, index: 2},
//     {content: 'Done', section_num: 3, index: 3}, 
//   ]

//   sectionSave(sections);
//   itemSave(items);
// })()

module.exports = app;