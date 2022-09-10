import React, {useState} from 'react';
import Sections from './components/Sections'
import './App.scss';

// import { Router } from 'express';
// import { Route } from 'react-router-dom';



const App = () => {

  const [saveDatas, setSaveDatas] = useState([]);

  return (
      <div className='todoList'>
        <div className='todoListContent'>
          <div className='title'> 
            <img className='todoImage' alt="🎒" aria-label="🎒" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f392.svg"></img>
            TODO LIST 
          </div>
          <div className="content">
            <Sections/>
          </div>
        </div>
      </div>
  );
}


// 다른 표현 - html 안에서 map으로 표현하기
// labeling.map((el, index) => {
//   return(
//     <OneSecTodo key={`section-${index}`} secId={el.secId} title={el.title} />
//   )
// })

export default App;