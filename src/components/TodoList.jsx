// TodoList.jsx
// Saari todos ki list dikhata hai
// Props milte hain: todos (array), onDelete (function)

import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map(function(todo) {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
}

export default TodoList;
