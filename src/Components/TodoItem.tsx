import { useTodos } from "../Context/useTodoContext";
import { TodoItem } from "../Context/type";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

const TodoItems = ({ todo }: { todo: TodoItem }) => {
  const { toggleTodo, deleteTodo } = useTodos();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,

          backgroundColor: todo.completed ? "#75b875" : "#f9f9f9",
          opacity: todo.completed ? 0.7 : 1,
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6">{todo.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {todo.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Chip
              label={`Priority: ${todo.priority}`}
              color="primary"
              size="small"
            />
            <Chip
              label={`Due: ${new Date(todo.dueDate).toLocaleDateString()}`}
              color="secondary"
              size="small"
            />
            <Chip
              label={`Completed: ${todo.completed ? "Yes" : "No"}`}
              color={todo.completed ? "success" : "default"}
              size="small"
            />
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button variant="contained" onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? "Undo" : "Complete"}
          </Button>
          <Button variant="contained" onClick={() => deleteTodo(todo.id)}>
            Delete
          </Button>
          <Button variant="contained">Edit</Button>
        </Box>
      </Card>
    </Box>
  );
};

export default TodoItems;
