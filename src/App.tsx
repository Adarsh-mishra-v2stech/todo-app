import { TodoProvider } from "./Context/useTodoContext";
import TodoForm from "./Components/TodoForm";
import { Typography } from "@mui/material";
import TodoList from "./Components/TodoLIst";
import DateRangeFilter from "./Components/Filters";

function App() {
  return (
    <TodoProvider>
      <Typography sx={{ mt: 4 }} variant="h4" align="center">
        Todo App
      </Typography>
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
