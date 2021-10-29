import axios from "axios";
import { useState } from "react";
import React, { useEffect } from "react";

// import React,{Component} from "react"
import img from "./../src/trash.png";
import "./index.css";
function List(props) {
  return (
    <div className="item">
      <span className={props.itemdata.iscomplete ? "taskdone":""} 
      onClick={()=> props.completeTask(props.index)}>{props.itemdata.description}</span>
      <img className="trash" src={img} onClick={ () => props.deleteTask(props.index)} />
    </div>
  );
}

function App() {
  const [state, setState] = useState("");

  useEffect(() => {
    axios.get("https://api.adviceslip.com/advice").then((response) => {
      {
        /* update state */
      }
      setState(response.data.slip.advice);
      console.log(response);
    });
  });

  const [taskInput, updtaeTask] = useState("");
  const [todoInput, updtaeTodo] = useState([]);
const  addnote =()=>
{
  todoInput.push({description:taskInput , iscomplete:false})
  updtaeTodo(todoInput)
  updtaeTask("")
}  

const deleteTask =(index) =>{
  const newlist = todoInput.filter((item,i) => i !== index)
  updtaeTodo(newlist)
}
const completeTask =(index) =>{
  const list =[...todoInput];
  list[index].iscomplete = true;
  updtaeTodo(list)
}
  return (
    <div className="maincontainer">
      <div className="main">
        <div className="main1">
          <div className="leftside">
            <h2 className="firsthead">Welcome to the to do list app</h2>
            <div className="quotecard">
              <h3 className="quote">" {state} " </h3>
            </div>
          </div>
        </div>
        <div className="main2">
          <div className="rightside">
            <div className="todobox">
              <input
                className="name"
                value={taskInput}
                placeholder="Enter Task"
                onChange={(event) => updtaeTask(event.target.value)}
              />
              <button className="btn" onClick={addnote}>Add</button>
        
              {todoInput?.length ? todoInput.map((todoObject,index)=>
                <List  index={index} itemdata={todoObject} deleteTask={deleteTask} completeTask={completeTask}/>
              ) : (
                <p className="notask">📌 No task Added !</p>
              )}
            </div>
            <div style={{marginTop: "2rem" ,color:"black",marginBottom:"2rem"}}>Made with❤️ Bharti</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
