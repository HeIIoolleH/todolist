import React from "react";
import './TodoItem.scss';
import {RiDeleteBinLine} from 'react-icons/ri';

const TodoItem = (props) => {
    const {content, id, onRemove } = props || {};
    return (
        <div className='todo-item' 
        // onClick={() => onToggle(id)}
        >
            <div className={`todo-content`}>
                <div>{content}</div>
            </div>
            <div  onClick={(e) => {
                e.stopPropagation(); // onToggle 이 실행되지 않도록 함
                onRemove(id)}
            }>
                <RiDeleteBinLine className="remove"/>
            </div>
        </div>
    );
}
  

export default TodoItem;