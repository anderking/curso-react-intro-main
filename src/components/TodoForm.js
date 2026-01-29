import React, { useContext, useState } from 'react';
import { TodoContext } from "context/TodoContext";

function TodoForm() {
  const [newTodoValue, setNewTodoValue] = useState('');
  const { addTodo, setOpenModal } = useContext(TodoContext);

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (newTodoValue.trim().length <= 0) return;
    addTodo(newTodoValue);
    setOpenModal(false);
  };

  return (
    <form onSubmit={onSubmit} className="TodoForm">
      <label className="TodoForm-label">Nueva tarea</label>
      <textarea
        className="TodoForm-textarea"
        value={newTodoValue}
        onChange={onChange}
        placeholder="Ej: Terminar el módulo de React"
        required
      />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="TodoForm-button TodoForm-button--add"
          disabled={!newTodoValue.trim()}
        >
          Añadir
        </button>
      </div>
    </form>
  );
}

export { TodoForm };