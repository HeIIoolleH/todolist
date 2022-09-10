import React, {Component} from 'react'
import TodoItem from './TodoItem';
import './TodoItem.scss';


const TodoItemList = (props) => {
    const {secId, todos, onToggle, onRemove} = props;

    // console.log("state =", todos.length)
    // console.log("todos =", todos)
    const todoList = todos.filter(obj => obj.state == secId).map(
        ({todoId, content, checked}) => (
          <TodoItem
            id={todoId}
            content={content}
            checked={checked}
            onToggle={()=>onToggle(todoId)}
            onRemove={onRemove}
            key={todoId}
          />
        )
      );

    // const todoList= () =>{
    //     for(let i=1; i <= todos.length; i++){
    //         let currentState = todos[i].state;
            
    //         let arrayState = [];
    //         arrayState.push(currentState)
            
    //         arrayState.filter((state) => state === secId).map(
    //             ({id, content, checked}) => (
    //                 <TodoItem
    //                 id={id}
    //                 content={content}
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