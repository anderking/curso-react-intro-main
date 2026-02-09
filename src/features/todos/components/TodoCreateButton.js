import React from "react";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "components/UI/Icons/AddIcon";

function TodoCreateButton() {
  const navigate = useNavigate();

  return (
    <button
      className="TodoCreateButton"
      onClick={() => navigate("/todos/form")}
      title="Crear nueva tarea"
    >
      <AddIcon color="white" />
    </button>
  );
}

export { TodoCreateButton };
