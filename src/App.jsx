// App.jsx - Root Component
// Saari state yahan hai
// Saare functions yahan hain
// Props ke through neeche jaate hain

import { useState, useEffect } from "react";
import { getTodos, addTodo, deleteTodo } from "./data";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  // GET - pehli baar data load karo
  useEffect(function() {
    const data = getTodos();
    setTodos(data);
  }, []);

  // POST - naya todo banana
  function handleAdd(text) {
    const newTodo = {
      id: Date.now(),
      text: text,
      done: false,
    };
    addTodo(newTodo);
    setTodos(getTodos());
  }

  // DELETE - todo hatana
  function handleDelete(id) {
    deleteTodo(id);
    setTodos(getTodos());
  }

  return (
    <div>
      <h1>Todo App</h1>

      <AddTodo onAdd={handleAdd} />

      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
}

export default App;
