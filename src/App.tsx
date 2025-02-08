import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { TodoProvider } from "./Context/useTodoContext";
import TodoForm from "./Components/TodoForm";

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <p>My Todo App</p>
        <TodoForm />
      </div>
    </TodoProvider>
  );
}

export default App;
