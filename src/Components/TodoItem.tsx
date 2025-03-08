import { useTodos } from "../Context/useTodoContext";
import { TodoItem } from "../Context/type";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CardActions,
} from "@mui/material";

const TodoItems = ({ todo }: { todo: TodoItem }) => {
  const { toggleTodo, deleteTodo, setEditTodo, duplicateTodo } = useTodos();

  const handleEdit = () => {
    setEditTodo(todo);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{ my: 2, width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mx: 4,
          padding: 2,
          mt: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6">{todo.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {todo.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Chip
              label={` ${todo.priority}`}
              color={
                todo.priority === "High"
                  ? "error"
                  : todo.priority === "Medium"
                  ? "warning"
                  : "success"
              }
              size="small"
            />
            <Chip
              label={`Due: ${new Date(todo.dueDate).toLocaleDateString()}`}
              color="default"
              size="small"
            />
            <Chip
              label={`Completed: ${todo.completed ? "Yes" : "No"}`}
              color={todo.completed ? "success" : "error"}
              size="small"
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color={todo.completed ? "success" : "primary"}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.completed ? "Undo" : "Complete"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleEdit()}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => duplicateTodo(todo)}
          >
            Duplicate
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default TodoItems;
