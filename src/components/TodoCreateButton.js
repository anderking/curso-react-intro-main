import React, { useContext } from "react";
import { TodoContext } from "context/TodoContext";

function TodoCreateButton() {
  const { setOpenModal } = useContext(TodoContext);
  return (
    <button
      className="TodoCreateButton"
      onClick={() => setOpenModal((prevState) => !prevState)}
    >
      +
    </button>
  );
}

export { TodoCreateButton };
