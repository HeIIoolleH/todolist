import React from 'react';
import './TodoListTemplate.css';
import Form from './Socket_Form';

const TodoListTemplate = (props) => {
  const {title} = props || {};
  return (
    <main className="todo-list-template">
      <div className="title">
        {title}
      </div>
      <section className="form-wrapper">
        <Form
        value={props.value}
        onKeyPress={props.onKeyPress}
        onChange={props.onChange}
        onCreate={props.onCreate}
        />
      </section>
      <section className="todos-wrapper">
        {props.children}
      </section>
    </main>
  );
};
export default TodoListTemplate;