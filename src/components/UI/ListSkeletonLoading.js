import React from 'react';

function ListSkeletonLoading() {
  return (
    <div className="ListSkeletonLoading-container">
      {/* Renderizamos 3 esqueletos para llenar el espacio */}
      {[1, 2, 3].map((n) => (
        <div key={n} className="ListSkeletonLoading-item">
          <div className="ListSkeletonLoading-circle"></div>
          <div className="ListSkeletonLoading-bar"></div>
          <div className="ListSkeletonLoading-circle"></div>
        </div>
      ))}
    </div>
  );
}

export { ListSkeletonLoading };