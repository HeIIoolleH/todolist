import React, {useState} from 'react';
import {useEffect} from 'react';
import OneSecTodo from './OneSecTodo';
import axios from 'axios';
import { io } from "socket.io-client";

const socket = io.connect("http://192.168.0.14:8002",{transports : ['websocket']},{path:'/socket.io'});
    
socket.on("connection",()=> {
  console.log("connection server");
})

// socket.emit("message", "핑")
// socket.on("message", function(req){
// })

const labeling = [
  {secId: 1, title:"To Do"}, 
  {secId: 2, title:"DOING"}, 
  {secId: 3, title:"DONE"}
]




const Sections = () => {

  const [exchangeDatas, setExchangeDatas] = useState({});
  const [removeDatas, setRemoveDatas] = useState({});
  // 요청의 결과 - 결과물
  const [todosDB, setTodosDB] = useState([]);


  const getTodosDB = async () => {
    try{
      const result = await axios.get("http://192.168.0.14:9000/read");
      return result.data;
    }catch(e){
      alert('getTodosDB::', e.message)
    }
  };
  
  const setTodosFromServer = async() => {
    const todosDB = await getTodosDB();
    const {todos: todos} = todosDB || {};
    console.log('todos :',todos);
    setTodosDB(todos);
  };


  useEffect(() => {
    if (todosDB.length === 0){
      setTodosFromServer();
    } else if (Object.keys(exchangeDatas).length !== 0){
      
      setTodosDB(todosDB.filter(todo => todo.todoId !== exchangeDatas.todoId))
      // setTodosDB(prevstate => prevstate.concat(exchangeDatas));
    } 
  },[exchangeDatas])

  useEffect(() =>{
    if (Object.keys(removeDatas).length !== 0){
      setTodosDB(todosDB.filter(todo => todo.todoId !== removeDatas.todoId))
    };
  },[removeDatas])

 

  useEffect(() => {
    socket.on('create', function(data){
      if (data !== todosDB){
        console.log('헬로')
        setTodosDB(prevstate => prevstate.concat(data));
      } else{
        return;
      }
    })
  },[]);

  socket.once('delete', function(data){
    
    if (Object.keys(data).length !== 0){
      setTodosDB(todosDB.filter(todo => todo.todoId !== data.todoId))
    };
  });

  socket.once('change', function(data){
    
    if (Object.keys(data).length !== 0){
      setTodosDB(todosDB.filter(todo => todo.todoId !== data.todoId))
      setTodosDB(prevstate => prevstate.concat(data));
    };
  });


  return (
    labeling.map(
    (label, index) =>(
      <OneSecTodo
      setTodosDB={setTodosDB}
      socket={socket}
      todosDB={todosDB}
      exchangeDatas={exchangeDatas}
      setExchangeDatas={setExchangeDatas}
      setRemoveDatas={setRemoveDatas}
      key={`section-${index}`}
      sectionsLength={labeling.length}
      secId={label.secId}
      title={label.title}/>
      )
    )
  ) 
};

export default Sections;