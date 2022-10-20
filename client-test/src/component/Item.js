import React, { useState } from "react"
import { RiDeleteBinLine } from "react-icons/ri";
import './Item.scss'

const Item = (props) => {
  const {id, sectionNum, content, index, deleteItem} = props

  return(
    <div className="item">
      <div className="content"> {content} </div>
      <div onClick={(e) => {
        e.stopPropagation();
        deleteItem(id)}
      }>
        <RiDeleteBinLine className="remove" />
      </div>
    </div>
  )

}

export default Item;