import React from "react";
import { MainLayout } from "components/Layaout/MainLayout";
import { TodoProvider } from "features/todos/context/TodoContext";
import { TodoPage } from "pages/TodoPage";
import "./App.css";

function App() {
  return (
    <MainLayout>
      <TodoProvider>
        <TodoPage />
      </TodoProvider>
    </MainLayout>
  );
}

export default App;