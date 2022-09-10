import React from 'react';
import './TodoListTemplate.scss';
import Form from './Form';

const TodoListTemplate = (props) => {
  const {title} = props || {};
  return (
    <div className="todo-list-template">
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