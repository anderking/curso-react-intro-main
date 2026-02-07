import React, { useContext } from "react";
import { TodoContext } from "context/TodoContext";
import { TodoHeader } from "components/TodoHeader";
import { TodoCounter } from "components/TodoCounter";
import { TodoSearch } from "components/TodoSearch";
import { TodoList } from "components/TodoList";
import { TodoItem } from "components/TodoItem";
import { TodoLoading } from "components/TodoLoading";
import { TodoCreateButton } from "components/TodoCreateButton";
import { Modal } from "components/Modal";
import { TodoForm } from "components/TodoForm";

function AppUI() {
  const {
    loading,
    error,
    totalItemsCompleted,
    totalItems,
    searchValue,
    setSearchValue,
    itemsFilterSearchValue,
    openModal,
    storageChange,
    toggleShow,
  } = useContext(TodoContext);

  return (
    <div className="App-container">
      {storageChange && (
        <div className="ChangeAlert">
          <p>Hubo cambios en otra pestaña</p>
          <button onClick={toggleShow}>Volver a cargar</button>
        </div>
      )}
      <TodoHeader loading={loading}>
        <TodoCounter
          totalItemsCompleted={totalItemsCompleted}
          totalItems={totalItems}
        />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </TodoHeader>

      <TodoList
        error={error}
        loading={loading}
        itemsFilterSearchValue={itemsFilterSearchValue}
        totalItems={totalItems}
        searchValue={searchValue}
        onError={() => <p className="status-msg">Error en los datos...</p>}
        onLoading={() => <TodoLoading />}
        onEmptyItems={() => <p className="status-msg">¡Crea tu primer TODO!</p>}
        onEmptySearchResults={(searchText) => (
          <p className="status-msg">No hay resultados para {searchText}</p>
        )}
        render={(todo) => <TodoItem key={todo.id} todo={todo} />}
      />

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
