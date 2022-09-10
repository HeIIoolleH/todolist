const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};
app.use(cors(corsOptions));



app.use(express.json());



const db = require('./models/index.js');
const sequelize = db.sequelize;
const todos = db.todos;


// ***********************************************************
// ************socket.io를 이용한 websocket 통신***************
// ***********************************************************
app.get('/', function(req, res){
  res.send('소켓 서버 8002포트가 실행중입니다.');
});

io.on('connection', function(socket){
  // socket.on('message', function(msg){
  //   console.log('메세지 받기',msg)
  //   socket.emit('message', '퐁')
  // });

  socket.on('create', function(createData) {
    // console.log('데이터 받고 보내기')
    io.emit('create',createData);
  });

  socket.on('delete', function(deleteData){
    // console.log('deleteData: ',deleteData)
    io.emit('delete', deleteData);
  });

  socket.on('change', function(changeData) {
    // console.log('changeData: ',changeData)
    io.emit('change', changeData);
  });
});



http.listen(8002, function() {
  console.log('listening on *:8002');
});





(async () => {
  await sequelize.sync();
})();
//  await sequelize.sync({ force: true });  // 서버가 실행될 때 시퀄라이저의 스키마를 DB에 적용시키는 기능
//  // force: true -> 기존 테이블이 있다면 건드리지 않는 것을 강제로 sync 메소드에 옵션 객체(변경점)를 전달하는 코드\
//  // 옵션 객체를 기존 테이블을 날리고 새 코드에 맞춰 저장하는 방법이니 실제에서는 사용 X


// *********************************************
// ***********axios를 이용한 http 통신***********
// *********************************************
app.get('/read', (req,res) => {
  (async() => {
    const todoDataAll = await todos.findAll();
    res.send({todos_data: todoDataAll});
  })();
})

app.post('/save', (req, res) => {
  (async() => {
    try {
      await todos.destroy({ where: { state: [1,2,3] } });
      // res.send({ message: "delete success" });
      await todos.create({
        todoID: req.body.todoID,
        state: req.body.state,
        text: req.body.text
      });
    } catch (e) {
      res.status(777).send(e);
    }

  })();
});

// app.post('/update', (req, res) => {
//   todos.update({state: req.body.change.state}, {
//       where: {id: req.body.change.id}})
//   .then(result => res.send(result))
//   .catch(err=>{throw err})
// })

// app.post('/delete', (req, res) => {
//   todos.destroy({
//       where: {id: req.body.del.id}
//   })
//   .then(res.sendStatus(200))
//   .catch(err=>{throw err})
// })











// const todolistDB_1 = db.todolistdb_1;
// const todolistDB_2 = db.todolistdb_2;
// const todolistDB_3 = db.todolistdb_3;
// 주석 처리한 방식으로 각각의 모델들에 대한 테이블 설정도 가능하다.
// todolist에서는 각각의 모델들의 테이블이 동일하기 때문 or 테이블이 하나만 필요하기 때문에 skip한다.


// (async() => {
//     await sequelize.sync({ force: true });  // 서버가 실행될 때 시퀄라이저의 스키마를 DB에 적용시키는 기능
//         // force: true -> 기존 테이블이 있다면 건드리지 않는 것을 강제로 sync 메소드에 옵션 객체(변경점)를 전달하는 코드\
//         // 옵션 객체를 기존 테이블을 날리고 새 코드에 맞춰 저장하는 방법이니 실제에서는 사용 X

//     // *********  데이터 추가하기 ***********//
//     await todos.create({       
//     // const todoData1 = await todolistDB.bulid({  ~~~~~~~~ await todoData1.save();-> 위과 동일
//         state: 1, 
//         todoId: '1e364o79-1246-6wlk-7wie-aga26ir8b982', 
//         text: '시범데이터1',
//     });
//     // console.log(todoData1);
    
//     await todos.bulkCreate([
//         {       
//         state: 2, 
//         todoId: '6c426e88-6021-4ffe-8eee-edd48fb6a532', 
//         text: '시범데이터2-1',
//         },
//         {       
//         state: 2, 
//         todoId: '1b893s48-3298-5clk-1wek-ekj98is5b929', 
//         text: '시범데이터2-2',
//         },
//     ]);
// })();



module.exports = app;
