import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "components/Layaout/MainLayout";
import { TodoProvider } from "features/todos/context/TodoContext";
import { TodoPage } from "pages/TodoPage";
import { TodoForm } from "features/todos/components/TodoForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<p>Módulo de Dashboard</p>} />

          <Route path="todos" element={<TodoProvider />}>
            <Route index element={<TodoPage />} />
            <Route path="form" element={<TodoForm />} />
            <Route path="form/:id" element={<TodoForm />} />
          </Route>

          <Route path="users" element={<p>Módulo de Usuarios</p>} />
        </Route>

        <Route path="*" element={<p>404</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
