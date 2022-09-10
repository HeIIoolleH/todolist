import React, { useEffect, useState } from 'react';
import './TodoListTemplate.scss';
import './Form.css'
import './TodoItem.scss';
import TodoListTemplate from './TodoListTemplate';
import TodoItemList from './TodoItemList';
import { v4 } from 'uuid';


function OneSecTodo(props) {

  const socket = props.socket;
  const todosDB = props.todosDB;
  const secId = props.secId;
  const title = props.title;
  const setExchangeDatas = props.setExchangeDatas;
  const sectionsLength = props.sectionsLength;
  const setTodosDB = props.setTodosDB;
  const setRemoveDatas = props.setRemoveDatas;




    
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

  const handleToggle = (todoId) => {        //  클릭을 통해 지정된 item의 state를 증가시키고 마지막섹션을 제외하고 Section의 exchangeData로 넘겨주는 기능

    // 파라미터로 받은 id를 가지고 몇번째 아이템인지 찾기
    const index = sectionTodos.findIndex(todo => todo.todoId == todoId);
    const selected = sectionTodos[index]; // 선택한 객체
    const nextTodos = [...sectionTodos]; // 배열을 복사
    

    // 기존 값들을 복사하고, 
    nextTodos[index] = {
      ...selected,
      state: selected.state + 1
    };

    console.log(nextTodos);
    setSectionTodos(nextTodos.filter(todo => todo.state === secId));
    
   
    if(secId <= sectionsLength) {
      const stateIncreaseData = nextTodos.find(todo => todo.state !== secId)
      setExchangeDatas(stateIncreaseData);
      socket.emit('change', stateIncreaseData);
    }; 
  };



  const handleRemove = (todoId) => {                                    // (후에) x표시 클릭을 통해 지정된 item의 id를 찾고 filter를 통해 제거하는 기능
    setSectionTodos(sectionTodos.filter(todo => todo.todoId !== todoId));
    const removingData = sectionTodos.find(todo => todo.todoId === todoId)
    setRemoveDatas(removingData);
    socket.emit('delete', removingData);
  };


  // socket.emit('message', "핑")
  // socket.on('message', function(req){
  //   console.log(req);
  // })
  return (
    <>
    <TodoListTemplate
      title = {title}
      value={input}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
      onCreate={handleCreate}
    ><TodoItemList todos={sectionTodos} onToggle={handleToggle} onRemove={handleRemove} secId={secId} />
    </TodoListTemplate>
    </>
  );
}


export default OneSecTodo;