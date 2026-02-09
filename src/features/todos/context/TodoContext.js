import React, { createContext, useState, useMemo } from "react";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useStorageListener } from "hooks/useStorageListener";
import { Outlet } from "react-router-dom";

// Definición del Contexto (Similar a una Interface o una Clase Base estática)
const TodoContext = createContext();

/**
 * TodoProvider: Orquestador de la lógica de negocio.
 * Centraliza el estado global para evitar el "Prop Drilling".
 */
function TodoProvider({ children }) {
  // Inyección de lógica de persistencia (Capa de Datos)
  const { items, saveItem, loading, error, sincronize } = useLocalStorage(
    "TODOS_V1",
    [],
  );

  // Inyección de escucha de eventos externos (Sincronización entre pestañas)
  const { storageChange, toggleShow } = useStorageListener(sincronize);

  // Estados locales de la UI (Capa de Presentación)
  const [searchValue, setSearchValue] = useState("");
  const [todoToDelete, setTodoToDelete] = useState(null);

  /**
   * itemsFilterSearchValue: Lógica de filtrado optimizada.
   * useMemo actúa como un "Cómputo bajo demanda" con Caché.
   * Solo se re-calcula si cambia el origen (items) o el criterio (searchValue).
   */
  const itemsFilterSearchValue = useMemo(() => {
    return items.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }, [items, searchValue]);

  // Propiedades calculadas (Computed properties)
  const totalItemsCompleted = itemsFilterSearchValue.filter(
    (todo) => !!todo.completed,
  ).length;
  const totalItems = items.length;

  // --- MÉTODOS DE ACCIÓN (Lógica de Negocio / Comandos) ---

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

  const editTodo = (id, newText) => {
    const todoIndex = items.findIndex((todo) => todo.id === Number(id));
    const newTodos = [...items];

    newTodos[todoIndex] = {
      ...newTodos[todoIndex],
      text: newText,
    };

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
    newTodos.splice(todoIndex, 1); // Eliminación por índice
    saveItem(newTodos);
    setTodoToDelete(null);
  };

  /**
   * El Provider expone la "API" que los componentes hijos consumirán.
   * Es el puente entre los hooks de bajo nivel y la interfaz de usuario.
   */
  return (
    <TodoContext.Provider
      value={{
        items, // Lista de TODOs
        loading, // Estado de carga inicial
        error, // Estado de error en persistencia
        totalItemsCompleted, // Contador para el Header
        totalItems, // Contador total
        searchValue, // Input de búsqueda
        setSearchValue, // Setter de búsqueda
        itemsFilterSearchValue, // Lista filtrada final
        addTodo, // Acción: Crear
        editTodo, // Acción: Editar
        completeTodo, // Acción: Marcar/Desmarcar
        deleteTodo, // Acción: Eliminar
        todoToDelete, // Estado para confirmar eliminación
        setTodoToDelete, // Setter para confirmar eliminación
        toggleShow, // Acción: Refrescar data (Storage Alert)
        storageChange, // Flag: ¿Hay cambios en otra pestaña?
      }}
    >
      {children}
      <Outlet />
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
