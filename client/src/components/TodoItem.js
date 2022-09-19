import React from "react";
import './TodoItem.scss';

const TodoItem = (props) => {
    const {content, id, onRemove } = props || {};
    return (
        <div className='todo-item' 
        // onClick={() => onToggle(id)}
        >
            <div className={`todo-content`}>
                <div>{content}</div>
            </div>
            <div className="remove" onClick={(e) => {
                e.stopPropagation(); // onToggle 이 실행되지 않도록 함
                onRemove(id)}
            }>X</div>
        </div>
    );
}
  

export default TodoItem;