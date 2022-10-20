import React, {useState} from 'react';
import Sections from './components/Sections'
import './App.scss';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { io } from "socket.io-client";

const socket = io.connect("http://192.168.0.14:8002",{transports : ['websocket']},{path:'/socket.io'});
    
socket.on("connection",()=> {
  console.log("connection server");
})
// import { Router } from 'express';
// import { Route } from 'react-router-dom';



const App = () => {
  console.log(socket);

  const [todosDB, setTodosDB] = useState([]);
  const [exchangeDatas, setExchangeDatas] = useState({});
  const [draggingItemSecNum, setDraggingItemSecNum] = useState(0);
  const onDragEnd = (result) => {
    // destination이 끝 위치, source가 시작 위치를 의미함
    const { destination, source, draggableId } = result;
    // droppableId는 어느 column에 위치하는지, index는 해당 column에서 몇번째 task인지
    console.log(source.index, source.droppableId);
    console.log(destination?.index, destination?.droppableId); // 아무곳에 놓으면 destination이 없을 수도 있다
    // console.log(destination);
    // console.log(draggableId);
    // dnd를 도중에 멈췄으므로(올바른 droppable 위에 두지 않았으므로) 그냥 리턴
    if (!destination) {
      setDraggingItemSecNum(0);
      return;
    }

    // 같은 자리에 가져다 두었다면 그냥 리턴
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      setDraggingItemSecNum(0);
      return;
    }
    

    const draggedTodoItem = todosDB.find(todo => todo.todoId === draggableId);
    draggedTodoItem.state = Number(destination.droppableId);

    setExchangeDatas(draggedTodoItem);
    socket.emit('change', draggedTodoItem);
    setDraggingItemSecNum(0);
    return;
  };

  const onDragUpdate = (update) => {
    console.log(update)
    const mouseOverSecNum = update.destination?.droppableId;
    setDraggingItemSecNum(Number(mouseOverSecNum));
  }

  return (
      <div className='todoList'>
        <div className='todoListContent'>
          <div className='title'> 
            <img className='todoImage' alt="🎒" aria-label="🎒" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f392.svg"></img>
            TODO LIST 
          </div>
          <DragDropContext 
          onDragEnd={onDragEnd}
          onDragUpdate={onDragUpdate}>
            <div className="content">
              <Sections
                todosDB={todosDB}
                setTodosDB={setTodosDB}
                exchangeDatas={exchangeDatas}
                setExchangeDatas={setExchangeDatas}
                draggingItemSecNum={draggingItemSecNum}
                socket={socket}/>
            </div>
          </DragDropContext>
        </div>
      </div>
  );
}


// 다른 표현 - html 안에서 map으로 표현하기
// labeling.map((el, index) => {
//   return(
//     <OneSecTodo key={`section-${index}`} secId={el.secId} title={el.title} />
//   )
// })

export default App;