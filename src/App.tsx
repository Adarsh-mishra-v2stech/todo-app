import { TodoProvider } from "./Context/useTodoContext";
import TodoForm from "./Components/TodoForm";
import { Typography } from "@mui/material";
import TodoList from "./Components/TodoLIst";

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
      <TodoList />
    </TodoProvider>
  );
}

export default App;
