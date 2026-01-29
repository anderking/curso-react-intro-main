import React from 'react';

function TodoLoading() {
  return (
    <div className="TodoLoading-container">
      {/* Renderizamos 3 esqueletos para llenar el espacio */}
      {[1, 2, 3].map((n) => (
        <div key={n} className="TodoLoading-item">
          <div className="TodoLoading-circle"></div>
          <div className="TodoLoading-bar"></div>
          <div className="TodoLoading-circle"></div>
        </div>
      ))}
    </div>
  );
}

export { TodoLoading };