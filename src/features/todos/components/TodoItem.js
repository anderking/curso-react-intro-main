import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "features/todos/context/TodoContext";
import { CheckIcon } from "components/UI/Icons/CheckIcon";
import { EditIcon } from "components/UI/Icons/EditIcon";
import { DeleteIcon } from "components/UI/Icons/DeleteIcon";

function TodoItem({ todo }) {
  const { completeTodo, setTodoToDelete } = useContext(TodoContext);
  const navigate = useNavigate();

  return (
    <li className="TodoItem">
      <button
        className={`Icon Icon-check ${todo.completed && "Icon-check--active"}`}
        onClick={() => completeTodo(todo.id)}
      >
        <CheckIcon color={todo.completed ? "#64ffda" : "gray"} />
      </button>

      <p className={`TodoItem-p ${todo.completed && "TodoItem-p--completed"}`}>
        {todo.text}
      </p>

      <div className="TodoItem-actions">
        <button
          className="Icon Icon-edit"
          onClick={() => navigate(`/todos/form/${todo.id}`)}
        >
          <EditIcon />
        </button>

        <button
          className="Icon Icon-delete"
          onClick={() => setTodoToDelete(todo)}
        >
          <DeleteIcon color="#ff4d4d" />
        </button>
      </div>
    </li>
  );
}

export { TodoItem };
