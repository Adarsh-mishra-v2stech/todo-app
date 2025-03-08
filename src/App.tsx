import { TodoProvider, useTodos } from "./Context/useTodoContext";
import TodoForm from "./Components/TodoForm";
import { Typography } from "@mui/material";
import TodoList from "./Components/TodoLIst";
import DateRangeFilter from "./Components/Filters";
import { useRef } from "react";

function App() {
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <TodoProvider>
      <Typography sx={{ mt: 4 }} variant="h4" align="center">
        Todo App
      </Typography>

      {/* Pass the ref to TodoForm */}
      <TodoForm />

      <Typography sx={{ textAlign: "center", mt: 6 }} variant="h5">
        My Todos
      </Typography>

      <DateRangeFilter />
      <TodoList />
    </TodoProvider>
  );
}

export default App;
