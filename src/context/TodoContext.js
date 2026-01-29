import React, { createContext, useState } from "react";
import { useLocalStorage } from "hooks/useLocalStorage";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const { items, saveItem, loading, error } = useLocalStorage("TODOS_V1", []);

  const [searchValue, setSearchValue] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const itemsFilterSearchValue = items.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const totalItemsCompleted = itemsFilterSearchValue.filter((todo) => !!todo.completed).length;
  const totalItems = items.length;


  const addTodo = (text) => {
    if (!text.trim()) return;
    const newTodos = [...items];
    newTodos.push({
      id: Date.now(),
      text,
      completed: false,
    });
    saveItem(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...items];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveItem(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = [...items];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
    newTodos.splice(todoIndex, 1);
    saveItem(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        totalItemsCompleted,
        totalItems,
        searchValue,
        setSearchValue,
        itemsFilterSearchValue,
        addTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
