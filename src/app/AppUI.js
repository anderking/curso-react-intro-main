import React, { useContext } from "react";
import { TodoContext } from "context/TodoContext";
import { TodoCounter } from "components/TodoCounter";
import { TodoSearch } from "components/TodoSearch";
import { TodoList } from "components/TodoList";
import { TodoItem } from "components/TodoItem";
import { TodoLoading } from "components/TodoLoading";
import { TodoCreateButton } from "components/TodoCreateButton";
import { Modal } from "components/Modal";
import { TodoForm } from "components/TodoForm";

function AppUI() {
  const { loading, error, itemsFilterSearchValue, openModal } =
    useContext(TodoContext);

  return (
    <div className="App-container">
      <TodoCounter />
      <TodoSearch />

      <TodoList>
        {error && <p className="status-msg">Error en los datos...</p>}
        {loading && <TodoLoading />}

        {!loading && !itemsFilterSearchValue.length && (
          <p className="status-msg">¡Crea tu primer TODO!</p>
        )}

        {!loading &&
          itemsFilterSearchValue.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
      </TodoList>

      {!!openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}

      <TodoCreateButton />
    </div>
  );
}

export { AppUI };
