import React, { useContext, useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TodoContext } from "features/todos/context/TodoContext";
import { TodoFormUI } from "./TodoFormUI";

function TodoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addTodo, editTodo, items, loading } = useContext(TodoContext);

  const [newTodoValue, setNewTodoValue] = useState("");
  const textareaRef = useRef(null);
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode && !loading) {
      const todoToEdit = items.find((item) => String(item.id) === String(id));
      if (todoToEdit) setNewTodoValue(todoToEdit.text);
    }
    if (textareaRef.current) textareaRef.current.focus();
  }, [isEditMode, id, items, loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodoValue.trim().length <= 0) return;

    if (isEditMode) editTodo(id, newTodoValue);
    else addTodo(newTodoValue);

    navigate("/todos");
  };

  return (
    <TodoFormUI
      label={isEditMode ? "Editar tarea" : "Nueva tarea"}
      placeholder="Ej: Terminar el módulo de React"
      value={newTodoValue}
      onChange={setNewTodoValue}
      onCancel={() => navigate("/todos")}
      onSubmit={handleSubmit}
      submitText={isEditMode ? "Guardar" : "Añadir"}
      textareaRef={textareaRef}
    />
  );
}

export { TodoForm };
