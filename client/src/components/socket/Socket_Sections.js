"use strict"
import React, {useState} from 'react';
import {useEffect} from 'react';
import OneSecTodo from './Socket_OneSecTodo';
import axios from 'axios';
import { io } from "socket.io-client";

const socket = io();

const labeling = [
  {secId: 1, title:"To Do"}, 
  {secId: 2, title:"DOING"}, 
  {secId: 3, title:"DONE"}
]



const Sections = (props) => {
  const setSaveDatas = props.setSaveDatas
  const [exchangeDatas, setExchangeDatas] = useState({})
  // 요청의 결과 - 결과물
  const [todosDB, setTodosDB] = useState([]);
  const [getSocketData, setGetSocketData] = useState({});

  const getTodosDB = async () => {
    try{
      const result = await axios.get("http://localhost:8000/read");
      return result.data;
    }catch(e){
      alert('getTodosDB::', e.message)
    }
  };
  
  const setTodosFromServer = async() => {
    const todosDB = await getTodosDB();
    // console.log(todosDB);
    const {todos_data: todosData} = todosDB || {};
    setTodosDB(todosData);
  };

  // console.log('todosDB :',todosDB);
  // console.log('exchangeDatas :',exchangeDatas);

  useEffect(() => {
    // console.log(todosDB);
    if (todosDB.length === 0){
      setTodosFromServer();
    } else if (Object.keys(exchangeDatas).length !== 0){
      // console.log(todosDB, exchangeDatas);
      setTodosDB(todosDB.filter(todo => todo.todoID !== exchangeDatas.todoID))
      setTodosDB(prevstate => prevstate.concat(exchangeDatas));    
    };
  },[exchangeDatas])

  setSaveDatas(todosDB);

  socket.on("todoData", async(data) => {
    setGetSocketData(data);
    if (todosDB.findIndex(x => x.todoID === data.todoID) === -1){
      setTodosDB(prevstate => prevstate.concat(data));
    }else{
      await setTodosDB(todosDB.filter(todo => todo.todoID !== data.todoID));
      setTodosDB(prevstate => prevstate.concat(data));
    };

  })


    
  
  return (
    labeling.map(
    (label, index) =>(
      <OneSecTodo
      todosDB={todosDB}
      exchangeDatas={exchangeDatas}
      setExchangeDatas={setExchangeDatas}
      key={`section-${index}`}
      sectionsLength={labeling.length}
      secId={label.secId}
      title={label.title}/>
      )
    )
  ) 
};

export default Sections;