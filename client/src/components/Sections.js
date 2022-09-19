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




const Sections = (props) => {
  const {todosDB, setTodosDB, exchangeDatas, setExchangeDatas, draggingItemSecNum} = props;
  const [removeDatas, setRemoveDatas] = useState({});
  // 요청의 결과 - 결과물


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
      setTodosDB(prevstate => prevstate.concat(exchangeDatas));
    } 
  },[])

  useEffect(() =>{
    if (Object.keys(removeDatas).length !== 0){
      setTodosDB(todosDB.filter(todo => todo.todoId !== removeDatas.todoId))
    };
  },[removeDatas])

 

  useEffect(() => {
    socket.on('create', function(data){
      if (data !== todosDB){
        setTodosDB(prevstate => prevstate.concat(data));
      } else{
        return;
      }
    })
  },[]);

  useEffect(() => {
    socket.on('delete', function(data){
      if (Object.keys(data).length !== 0){
        setTodosDB(todosDB.filter(todo => todo.todoId !== data.todoId))
      };
    });
  },[todosDB]);

  
  useEffect(() => {
    socket.on('change', function(data){
      if (Object.keys(data).length !== 0){

        const changeTodoItem = todosDB.filter(todo => todo.todoId !== data.todoId)

        setTodosDB(changeTodoItem);
        setTodosDB(prevstate => prevstate.concat(data));
      };
    });
  },[todosDB]);
  

  // console.log('aaaaa',todosDB);

  return (
    labeling.map(
    (label, index) =>(
      <OneSecTodo
      socket={socket}
      todosDB={todosDB}
      exchangeDatas={exchangeDatas}
      draggingItemSecNum={draggingItemSecNum}
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