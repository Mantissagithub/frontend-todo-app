import React, { useState, useEffect } from 'react';
import './App.css';

function useTodo(){
  const [todos, setTodos] = useState([]);

console.log("render");

useEffect(() => {
  fetch("http://localhost:3000/todos", {
    method: "GET"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setTodos(data);
    })
}, []);
setInterval(() => {
  fetch("http://localhost:3000/todos", {
    method: "GET"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setTodos(data);
    })
},1000);

return todos;
}

function App() {
  const todos = useTodo();

  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      
    </div>
  );
}

function Todo(props) {
  return (
    <div>
      <div>Title: {props.todo.title}</div>
      <div>Description: {props.todo.description}</div>
      <div>ID: {props.todo.id}</div>
      <button>Delete</button>
    </div>
  );
}

export default App;
