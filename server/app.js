// controller 불러오기
const createTodos = require('./controller/createTodos.js');
const deleteTodos = require('./controller/deleteTodos.js');
const getTodos = require('./controller/getTodos.js');
const updateTodos = require('./controller/updateTodos.js');
const saveTodos = require('./controller/saveTodos.js')

// http 접속을 위한 cor 옵션 넣기
const cors = require('cors')

// express 설정
const express = require('express');
const app = express();

// socket 설정 및 http통신->socket통신
const http = require('http').Server(app);
const io = require('socket.io')(http);


// cors 옵션 설정
const corsOptions = {
  origin: "*", // 출처 허용 옵션 - 전체 출처 허용
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));


app.use(express.json());




// ***********************************************************
// ************socket.io를 이용한 websocket 통신***************
// ***********************************************************
app.get('/',function(req, res){
  res.send('소켓 서버 8002포트가 실행중입니다.');
});

io.on('connection',function(socket){

  socket.on('create', function(createTodo){
    io.emit('create',createTodo);
    createTodos(createTodo);
  })

  socket.on('delete', function(deleteTodo){
    io.emit('delete', deleteTodo);
    deleteTodos(deleteTodo);
  });

  socket.on('change', function(updateTodo) {
    io.emit('change', updateTodo);
    updateTodos(updateTodo);
  });

});

http.listen(8002, function() {
  console.log('listening on *:8002');
});



// *********************************************
// ***********axios를 이용한 http 통신***********
// *********************************************
app.post('/save', (req, res) => {
  const saveTodo = req.body
  saveTodos(saveTodo);
});

app.post('/delete', (req, res) => {
  const deleteTodo = req.body
  deleteTodos(deleteTodo);
});


app.post('/update', (req, res) => {
  const updateTodo = req.body
  updateTodos(updateTodo);
});


app.get('/read', async(req,res) => {
  const todos = await getTodos();
  res.send({todos:todos});
});




// // ***** terminal 명령어를 통한 DB Table 생성 *****
// const db = require('./models/index.js');
// const sequelize = db.sequelize;

// (async () => {
//   await sequelize.sync({ force: true });
// })();
// //  await sequelize.sync({ force: true });  // 서버가 실행될 때 시퀄라이저의 스키마를 DB에 적용시키는 기능
// //  force: true -> 기존 테이블이 있다면 건드리지 않는 것을 강제로 sync 메소드에 옵션 객체(변경점)를 전달하는 코드
// //  옵션 객체를 기존 테이블을 날리고 새 코드에 맞춰 저장하는 방법이니 실제에서는 사용 X

module.exports = app;
