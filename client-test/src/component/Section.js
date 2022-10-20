import axios from "axios";
import React, { useState, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Item from "./Item";
import './Section.scss'


const Section = (props) => {
  const {sectionNum, sectionName, socket, items} = props;
  const [input, setInput] = useState('');

  
  const getInput = (e) => setInput(e.target.value);

  const createItem = async() => {
    if(input !== ''){
      const createdItem = {
        section_num: sectionNum,
        content: input,
        index: items.length
      };
      socket.emit('createItem',createdItem);
      setInput('');
    }
    
    if(input === ''){
      alert('입력은 빈값이면 안됩니다.')
    }
  }

  const pressEnter = (e) => {
    if(e.key === 'Enter') {
      createItem();
    }
  }

  const deleteItem = (itemId) => {
    const removingItem = items.find(item => item.id === itemId);
    socket.emit('deleteItem',removingItem);
  }



  return(
    <Droppable droppableId={sectionNum.toString()}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps} >
        <div className="section">
          <div className="section-title">
            {sectionName}
          </div>
          <div className="item-list">
            {items.map(
              (label, index) => (
                <Draggable key={label.id.toString()} draggableId={label.id.toString()} index={index}>
                  {(provided) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                      <Item
                        id={label.id}
                        sectionNum={sectionNum}
                        content={label.content}
                        index={label.index}
                        deleteItem={deleteItem}
                      />
                    </div>
                  )}
                </Draggable>
              )
            )}
          </div>
          <div className="input-area">
            <input className= 'input-box' value={input} onChange={getInput} onKeyPress={pressEnter}/>
            <div className='create-button' onClick={createItem}> 
            +
            </div>
          </div>
        </div>
        {provided.placeholder}
      </div>
    )}
    </Droppable>
  )

}

export default Section;