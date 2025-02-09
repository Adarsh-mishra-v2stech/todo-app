import { TodoProvider } from "./Context/useTodoContext";
import TodoForm from "./Components/TodoForm";
import { Typography } from "@mui/material";

function App() {
  return (
    <TodoProvider>
      <Typography sx={{ mt: 4 }} variant="h4" align="center">
        Todo App
      </Typography>
      <TodoForm />
    </TodoProvider>
  );
}

export default App;
