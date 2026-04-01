// AddTodo.jsx
// Naya todo add karne ka form
// Props milte hain: onAdd (function)

import { useState } from "react";

function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (text === "") {
      return;
    }

    onAdd(text);   // parent ko text bheja
    setText("");   // input clear kiya
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={function(e) { setText(e.target.value); }}
        placeholder="Naya todo likho"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;
