import React, { useContext } from "react";
import { TodoContext } from "features/todos/context/TodoContext";
import { HeaderLayout } from "components/Layaout/HeaderLayout";
import { TodoCounter } from "features/todos/components/TodoCounter";
import { InputSearchUI } from "components/UI/InputSearchUI";
import { ListContainer } from "components/UI/ListContainer";
import { TodoItem } from "features/todos/components/TodoItem";
import { ListSkeletonLoading } from "components/UI/ListSkeletonLoading";
import { TodoCreateButton } from "features/todos/components/TodoCreateButton";
import { Modal } from "components/UI/Modal";
import { ConfirmActionUI } from "components/UI/ConfirmActionUI";

function TodoPage() {
  const {
    loading,
    error,
    totalItemsCompleted,
    totalItems,
    searchValue,
    setSearchValue,
    itemsFilterSearchValue,
    todoToDelete,
    setTodoToDelete,
    deleteTodo,
  } = useContext(TodoContext);

  return (
    <div className="App-container">
      <HeaderLayout loading={loading}>
        <TodoCounter
          totalItemsCompleted={totalItemsCompleted}
          totalItems={totalItems}
        />
        <InputSearchUI
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </HeaderLayout>

      <ListContainer
        error={error}
        loading={loading}
        itemsFilterSearchValue={itemsFilterSearchValue}
        totalItems={totalItems}
        searchValue={searchValue}
        onError={() => <p className="status-msg">Error en los datos...</p>}
        onLoading={() => <ListSkeletonLoading />}
        onEmptyItems={() => <p className="status-msg">¡Crea tu primer TODO!</p>}
        onEmptySearchResults={(searchText) => (
          <p className="status-msg">No hay resultados para {searchText}</p>
        )}
        render={(todo) => <TodoItem key={todo.id} todo={todo} />}
      />

      <ConfirmActionUI
        isOpen={!!todoToDelete}
        title="Eliminar Tarea"
        description={`¿Estás seguro de que quieres borrar: "${todoToDelete?.text}"?`}
        onConfirm={() => deleteTodo(todoToDelete.id)}
        onCancel={() => setTodoToDelete(null)}
        confirmText="Sí, eliminar"
        cancelText="No, cancelar"
      />

      <TodoCreateButton />
    </div>
  );
}

export { TodoPage };
