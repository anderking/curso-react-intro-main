import React, { useContext } from "react";
import { TodoContext } from "context/TodoContext";

function TodoCounter() {
  const { totalItemsCompleted, totalItems } = useContext(TodoContext);
  return (
    <h1 className="TodoCounter">
      Has completado {totalItemsCompleted} de {totalItems}
    </h1>
  );
}

export { TodoCounter };
