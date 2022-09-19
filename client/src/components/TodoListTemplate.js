import React, { useState } from 'react';
import './TodoListTemplate.scss';
import Form from './Form';
import AddTaskIcon from '../asset/add_task_icon.png'

const TodoListTemplate = (props) => {
  const {title, draggingItemSecNum, secId} = props || {};

  return (
    <div className="todo-list-template">
      {draggingItemSecNum === secId && 
        <div className="add-draggable-task">
          <div className='add-task-comment'>Add Task Here</div>
          <img className='add-task-icon' src={AddTaskIcon}/>
        </div>
      }
      <div className="todo-list-title">
        {title}
      </div>
      <div className="todos-wrapper">
        {props.children}
      </div>
      <div className="form-wrapper">
        <Form
        value={props.value}
        onKeyPress={props.onKeyPress}
        onChange={props.onChange}
        onCreate={props.onCreate}
        />
      </div>
    </div>
  );
};
export default TodoListTemplate;