import React, { useContext } from "react";
import { TodoContext } from "context/TodoContext";

function TodoItem({ todo }) {
  const { completeTodo, deleteTodo } = useContext(TodoContext);
  return (
    <li className="TodoItem">
      <button
        className={`Icon Icon-check ${todo.completed && "Icon-check--active"}`}
        onClick={() => completeTodo(todo.id)}
      >
        V
      </button>
      <p className={`TodoItem-p ${todo.completed && "TodoItem-p--completed"}`}>
        {todo.text}
      </p>
      <button className="Icon Icon-delete" onClick={() => deleteTodo(todo.id)}>
        X
      </button>
    </li>
  );
}

export { TodoItem };
