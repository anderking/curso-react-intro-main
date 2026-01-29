import React, { useContext } from "react";
import { TodoContext } from "context/TodoContext";

function TodoSearch() {
  const { searchValue, setSearchValue } = useContext(TodoContext);

  return (
    <input
      className="TodoSearch"
      placeholder="Buscar tarea..."
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value);
      }}
    />
  );
}

export { TodoSearch };
