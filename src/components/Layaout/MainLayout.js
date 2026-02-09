import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="MainLayout-container">
      <nav className="MainLayout-nav">
        <div className="MainLayout-logo">✅ TaskMaster</div>
        <ul className="MainLayout-menu">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/todos"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Tareas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Usuarios
            </NavLink>
          </li>
        </ul>
      </nav>

      <main className="MainLayout-content">
        <Outlet />
      </main>

      <footer className="MainLayout-footer">
        <p>Desarrollado con React & ❤️</p>
      </footer>
    </div>
  );
}

export { MainLayout };
