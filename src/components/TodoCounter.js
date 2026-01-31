import React from "react";

function TodoCounter({ totalItemsCompleted, totalItems, loading }) {
  return (
    <h1 className={`TodoCounter ${!!loading && "TodoCounter--loading"}`}>
      Has completado {totalItemsCompleted} de {totalItems}
    </h1>
  );
}

export { TodoCounter };
