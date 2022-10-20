import React, {useState} from 'react'
import TodoItem from './TodoItem';
import './TodoItem.scss';
import './TodoItemList.scss';
import { Droppable, Draggable } from "react-beautiful-dnd";


const TodoItemList = (props) => {
  const {secId, todos, onRemove} = props;

  const todoList = todos.filter(obj => obj.state === secId).map(
    ({todoId, content}, index) => (
      <Draggable key={todoId} draggableId={todoId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
              <TodoItem
                id={todoId}
                content={content}
                // onToggle={()=>onToggle(todoId)}
                onRemove={onRemove}
                key={todoId}
                />
          </div>
        )}
      </Draggable>
    )
  );


  
  return (
    // <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={secId.toString()}>
        {(provided) => (
          <div className='todo-item-list' 
          ref={provided.innerRef} {...provided.droppableProps}
          >
                {todoList} 
          </div>
        )}
      </Droppable>
    // </DragDropContext>
  );
}

export default TodoItemList;