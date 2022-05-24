import React, { useEffect, useState } from "react";
import "./Todo.module.css"

export default function Todo(){
    
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const saveInfo=()=> {
    fetch("https://1vdvp4.sse.codesandbox.io/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text:newTodo,
        isCompleted: false,
      }),
    })
    .then((res)=> res.json())
    .then((data) => {
      setTodos([...todos, data]);
      setNewTodo("");
    });
  };

  useEffect(() => {
     fetch("https://1vdvp4.sse.codesandbox.io/todos")
     .then((res) => res.json())
     .then((data) => {
       //console.log(data) ;
       setTodos(data)
     });
  },[]);

  const deleteTodo = (value) => {
    setTodos(todos.filter((todo) => todo !== value)) ;
  }

  return (
    <div>

        <div>
          <div >
            <input  placeholder="Write Something"
            value={newTodo}
            onChange={({ target }) => setNewTodo(target.value)}
            />
            <button onClick={saveInfo} className="add" >+</button>
            
          </div>
         <div > {todos.map((todo) => (
            <div className="div1" key={todo.id} > 
            <button className="editb" >edit</button>
            <h3>{todo.text}</h3>
            <button className="deleteb" onClick={()=> deleteTodo(todo)} >delete</button>
            </div>
          ))}</div>
         
        </div>

    </div>


  )
}

