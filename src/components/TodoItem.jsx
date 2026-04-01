// TodoItem.jsx
// Ek akela todo item dikhata hai
// Props milte hain: todo (object), onDelete (function)

function TodoItem({ todo, onDelete }) {
  return (
    <li>
      <span>{todo.text}</span>

      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
