import React from 'react';
import './MainLayout.css';

function MainLayout({ children }) {
  return (
    <div className="MainLayout-container">
      <nav className="MainLayout-nav">
        <div className="MainLayout-logo">✅ TaskMaster</div>
        <ul className="MainLayout-menu">
          <li>Tareas</li>
          <li>Usuarios</li>
        </ul>
      </nav>

      <main className="MainLayout-content">
        {children}
      </main>

      <footer className="MainLayout-footer">
        <p>Desarrollado con React & ❤️</p>
      </footer>
    </div>
  );
}

export { MainLayout };