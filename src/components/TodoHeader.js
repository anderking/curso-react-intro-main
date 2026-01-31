import React from "react";

function TodoHeader({ children, loading }) {
  return (
    <header>
      {/* Iteramos sobre cada hijo y le creamos un clon al que le inyectamos la prop 'loading' */}
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { loading }),
      )}
    </header>
  );
}

export { TodoHeader };
