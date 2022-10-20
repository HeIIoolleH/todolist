import React, {useEffect, useState} from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import { io } from "socket.io-client";
import Section from "./Section";
import './Main.scss';


const socket = io.connect("http://192.168.0.14:8002",{transports : ['websocket']},{path:'/socket.io'});

const Main = () =>{
  const [sections, setSections] = useState([]);
  const [items, setItems] = useState([]);

  socket.on("connection",()=> {
    console.log("connection server");
  })
  
  // 섹션 번호에 따른 아이템 가져오기
  const getSectionItems = (sectionNum) => {
    return items.filter(item => item.section_num == sectionNum)
  }


  // 서버로부터 Item 데이터 가져오기
  const getItems = async() => {
    try{
      const result = await axios.get(`http://192.168.0.14:8009/items`)
      return result.data.items
    }catch(e){
      alert('getItems : ', e.message)
    }
  }
  
  useEffect(() => {
    const getItemFromServer = async() =>{
      const itemsFromServer= await getItems();
      // console.log(itemsFromServer);
      setItems(itemsFromServer);
    }
    getItemFromServer();
  },[])

  
  // 서버로부터 Section 데이터 가져오기
  const getSections = async () => {
    try{
      const result = await axios.get('http://192.168.0.14:8009/sections')
      return result.data.sections;
    }catch(e){
      alert('getSections : ', e.message)
    }
  };
  
  useEffect(() => {
    const getSecFromServer = async() =>{
      const sectionsFromServer= await getSections();
      // console.log(122131231, sectionsFromServer);
      setSections(sectionsFromServer);
    } 
    getSecFromServer();
  }, [])
  
  


  // socket 데이터 수신
  useEffect(() => {
    socket.on(`createItem`,(items)=> {
console.log(items);
    setItems(items);
  })
  }, [])

  useEffect(() => {
    socket.on(`deleteItem`,(items)=> {
console.log(items);
    setItems(items);
  })
  }, [])

  useEffect(() => {
    socket.on(`updateItem`,(items)=> {
console.log(items);
setItems(items);
})
  }, [])
  
  

  const onDragEnd = async(result) => {
    // destination이 끝 위치, source가 시작 위치를 의미함
    const { destination, source, draggableId } = result;
    const sectionNum = destination.droppableId;
    const sectionItems = getSectionItems(sectionNum);
    const notDraggingItems = sectionItems.filter(item => item.id != draggableId);
    const beforeSectionNum = source.droppableId;
    const beforeSectionItems = getSectionItems(beforeSectionNum);
    const beforSectionItemsNotDragging = beforeSectionItems.filter(item => item.id != draggableId);
    const draggingItem = items.find(item => item.id == draggableId);


    // droppableId는 어느 column에 위치하는지, index는 해당 column에서 몇번째 task인지
// console.log('source.index : ',source.index,'|| 처음 section의 number : ', source.droppableId);
// console.log('destination?.index : ', destination?.index, '|| 놓는 section의 number : ', destination?.droppableId); // 아무곳에 놓으면 destination이 없을 수도 있다
    

    // dnd를 도중에 멈췄으므로(올바른 droppable 위에 두지 않았으므로) 그냥 리턴
    if (!destination) {
      return;
    }

    // 같은 자리에 가져다 두었다면 그냥 리턴
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 같은 섹션 다른 위치에 가져다 두었다면 
    if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      notDraggingItems.map(item => {
        if(item.index >= destination.index && item.index < source.index){
          item.index++;
        }
        if(item.index <= destination.index && item.index > source.index){
          item.index--;
        }
      })
      
      draggingItem.index = destination.index;
      
      const changedItems = notDraggingItems.concat(draggingItem);
      console.log(changedItems);
      socket.emit('updateItem',changedItems);
      
      return;
    }

    // 다른 섹션에 가져다 두었다면
    if (
      destination.droppableId !== source.droppableId
    ){
      beforSectionItemsNotDragging.map(item => {
      if(item.index > source.index){
        console.log(2);
        item.index--;
        console.log(2);
      }})
      notDraggingItems.map(item => {
        if(item.index >= destination.index){
          item.index++;
        }
      })
      draggingItem.index = destination.index;
      draggingItem.section_num = destination.droppableId;

      const draggingItems = notDraggingItems.concat(draggingItem);
      const changedItems = draggingItems.concat(beforSectionItemsNotDragging);

      socket.emit('updateItem', changedItems)
    }
  }


  return (
    <div className='todoList'>
        <div className='title'> 
            {/* <img className='todoImage' alt="🎒" aria-label="🎒" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f392.svg"></img> */}
            TODO LIST 
        </div>
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <div className="section-content">
          {sections.map(
            (label) =>(
              <Section
                items = {items.filter(item => item.section_num === label.id)}
                socket={socket}
                sectionNum={label.id}
                sectionName={label.name}
                key={`section-${label.index}`}
                sectionsLength={sections.length}
                title={label.name}
              />
            )
          )}
          </div>
        </DragDropContext>
    </div>
  )

}

export default Main;