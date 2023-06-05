import React, { useEffect, useState } from "react";
import "./style.css";


const getLocalData = () => {
    const lists = localStorage.getItem("myToDoList");

    if(lists){
      return JSON.parse(lists);
    }
    else {
      return [];
    }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");

  //adds the items function
  const addItem = () => {
    if (!inputData) {
      alert("please fill the data");
    }
    else if(inputData && toggleButton){
      setItems(items.map((curElem) => {
        if(curElem.id == isEditItem){
          return { ...curElem, name: inputData};
        }
        else {
          return curElem;
        }
      }))
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };
  const deleteItem = (index) => {
    // console.log(index)
    const updatedItem = items.filter( (curElem) => {
      console.log(curElem);
      return curElem.id !== index;
    });
    setItems(updatedItem);
  }
  const removeAll = () => {
    setItems([]);
  }
  const editItem = (index) => {
    const item_todo_edited = items.find( (curElem) => {
      return curElem.id === index;
    })
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  }

  useEffect(() => {
    localStorage.setItem("myToDoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              value={inputData}
              className="form-control"
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
                <i className="far fa-edit add-btn" onClick={addItem}></i>
                ) : (
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((curItem) => {
              return (
                <div className="eachItem" key={curItem.id}>
                  <h3>{curItem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={ () => editItem(curItem.id) }></i>
                    <i className="far fa-trash-alt add-btn"  onClick= {()=>deleteItem(curItem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="REMOVE ALL"  onClick={ ()  => removeAll()}>
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
