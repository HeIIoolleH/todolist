import React, { useEffect, useState } from 'react';
import './TodoListTemplate.scss';
import './Form.scss'
import './TodoItem.scss';
import TodoListTemplate from './TodoListTemplate';
import TodoItemList from './TodoItemList';
import { v4 } from 'uuid';


function OneSecTodo(props) {

  const {socket, todosDB, secId, title, setExchangeDatas, setRemoveDatas, draggingItemSecNum} = props;



    
  const [input, setInput] = useState('')
  const [sectionTodos,setSectionTodos] = useState([]);
  

  


  useEffect(() => {
    if(todosDB.length !== 0){
      let tempSecData = todosDB.filter(todo => todo.state === secId)
      setSectionTodos(tempSecData);
    }
  },[todosDB])

  

  // ---------------- 여러가지 기능들 -------------
  
  const handleChange = (e) => setInput(e.target.value); // input의 다음 바뀔 값
  
  
  const handleCreate = () => {         //인풋받은 텍스트와 다른 정보들을 하나의 오브젝트로 저장
    const initialDataForm = {
      state: secId,
      todoId: v4(),
      content: input
    }
    
    // class 형에서 추가하는 방법
    // const { input, sectionTodos } = {
    //   input: '', // 인풋 비우고
    //   // concat 을 사용하여 배열에 추가
    //   sectionTodos: sectionTodos.concat({
    //     todoId: todoId++,
    //     content: input
    //   })
    // };
    
    // setSectionTodos(prevState => prevState.concat(initialDataForm));      // 권장하지않는 방법 : setSectionTodos(sectionTodos.concat(initialDataForm))
    setExchangeDatas(initialDataForm);
    socket.emit('create', initialDataForm);
    setInput('');
  }

  const handleKeyPress = (e) => {
    // 눌려진 키가 enter면 handleCreate 호출
    
    if(e.key === 'Enter') {
      handleCreate();
    }
  }


  const handleRemove = (todoId) => {               // (후에) x표시 클릭을 통해 지정된 item의 id를 찾고 filter를 통해 제거하는 기능
    setSectionTodos(sectionTodos.filter(todo => todo.todoId !== todoId));
    const removingData = sectionTodos.find(todo => todo.todoId === todoId)
    setRemoveDatas(removingData);
    socket.emit('delete', removingData);
  };


  

  return (
    <>
      <TodoListTemplate
        secId={secId}
        title = {title}
        value={input}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        onCreate={handleCreate}
        draggingItemSecNum={draggingItemSecNum}>
        <TodoItemList 
          todos={sectionTodos}
          // onToggle={handleToggle} 
          onRemove={handleRemove} 
          secId={secId}/>
      </TodoListTemplate>
    </>
  );
}


export default OneSecTodo;