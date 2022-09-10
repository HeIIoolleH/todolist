import React from 'react'
import TodoItem from './Socket_TodoItem';
import './TodoItem.css';


const TodoItemList = (props) => {
    const {secId, todos, onToggle, onRemove} = props;

    // console.log("state =", todos.length)
    // console.log("todos =", todos)
    const todoList = todos.filter(obj => obj.state == secId).map(
        ({todoID, text, checked}) => (
          <TodoItem
            id={todoID}
            text={text}
            checked={checked}
            onToggle={()=>onToggle(todoID)}
            onRemove={onRemove}
            key={todoID}
          />
        )
      );

    // const todoList= () =>{
    //     for(let i=1; i <= todos.length; i++){
    //         let currentState = todos[i].state;
            
    //         let arrayState = [];
    //         arrayState.push(currentState)
            
    //         arrayState.filter((state) => state === secId).map(
    //             ({id, text, checked}) => (
    //                 <TodoItem
    //                 id={id}
    //                 text={text}
    //                 checked={checked}
    //                 onToggle={onToggle}
    //                 onRemove={onRemove}
    //                 key={id}
    //                 />
    //             )
    //         )
    //     }
    // };

    return (
        <div>
            {todoList} 
        </div>
    );
}

export default TodoItemList;