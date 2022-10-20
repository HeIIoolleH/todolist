// var express = require('express');
// var app = express();
// var router = express.Router();

// var server = require('http').createServer(app); // http server를 socket.io server로 upgrade한다
// var io = require('socket.io')(server);


// const db = require('./models/index.js');
// const todolistDB = db.todolistDB;

// // sequelize - node.js - client 통신
// app.get('/read', (req,res) => {
//   (async() => {
//     const todoDataAll = await todolistDB.findAll();
//     res.send({todos_data: todoDataAll});
//   })();
// })

// app.post('/update', (req, res) => {
//   todolistDB.update({state: req.body.change.state}, {
//       where: {id: req.body.change.id}})
//   .then(result => res.send(result))
//   .catch(err=>{throw err})
// })

// app.post('/delete', (req, res) => {
//   todolistDB.destroy({
//       where: {id: req.body.del.id}
//   })
//   .then(res.sendStatus(200))
//   .catch(err=>{throw err})
// })

// app.post('/add', (req, res) => {
//   todolistDB.create({
//       name: req.body.data
//   })
//   console.log(req.body.data)
//   .then(result => res.send(result))
//   .catch(err => {throw err})
// })


// // // socket 통신
// // app.set('view engine', 'ejs'); // 렌더링 엔진 모드를 ejs로 설정
// // app.set('views',  __dirname + '/views');    // ejs이 있는 폴더를 지정

// // app.get('/', (req, res) => {
// //     res.render('index');    // index.ejs을 사용자에게 전달
// // })

// // io.on('connection', (socket) => {   //연결이 들어오면 실행되는 이벤트
// //     // socket 변수에는 실행 시점에 연결한 상대와 연결된 소켓의 객체가 들어있다.
    

// //     //socket.emit으로 현재 연결한 상대에게 신호를 보낼 수 있다.
// //     socket.emit('usercount', io.engine.clientsCount);

// //     // on 함수로 이벤트를 정의해 신호를 수신할 수 있다.
// //     socket.on('message', (msg) => {
        
// //         console.log('Message received: ' + msg);  //msg에는 클라이언트에서 전송한 매개변수가 들어온다. 이러한 매개변수의 수에는 제한이 없다.

// //         // io.emit으로 연결된 모든 소켓들에 신호를 보낼 수 있다.
// //         io.emit('message', msg);
// //     });
// // });

// // server.listen(3000, function() {
// //   console.log('Listening on http://localhost:3000/');
// // });

// module.exports = app;

