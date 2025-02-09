import { useState } from "react";
import { useTodos } from "../Context/useTodoContext";
import {
  Grid,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TodoList from "./TodoLIst";
import { Priority } from "../Context/type";

const TodoForm = () => {
  const { addTodo, todos } = useTodos();
  const generateId = () => Date.now().toString();
  const [todosData, setTodosData] = useState({
    id: "",
    title: "",
    description: "",
    completed: false,
    dueDate: "", // Changed to null for DatePicker compatibility
    priority: Priority.Medium,
  });

  const handleTodosChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTodosData({
      ...todosData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePriorityChange = (e: any) => {
    setTodosData({
      ...todosData,
      priority: e.target.value,
    });
  };
  console.log(todos);
  const handleAddTodo = () => {
    addTodo({ ...todosData, id: generateId() });
    alert("Todo added successfully");
    setTodosData({
      id: "",
      title: "",
      description: "",
      completed: false,
      dueDate: "",
      priority: Priority.Medium,
    });
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"} my={4}>
        <Box
          component="form"
          sx={{
            display: "grid",
            width: "650px",
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            gap: 2,
          }}
          autoComplete="off"
        >
          <TextField
            required
            label="Title"
            size="small"
            name="title"
            value={todosData.title}
            onChange={handleTodosChange}
          />
          <TextField
            required
            label="Description"
            size="small"
            name="description"
            multiline
            value={todosData.description}
            onChange={handleTodosChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              slotProps={{ textField: { size: "small", required: true } }}
              name="dueDate"
              value={todosData.dueDate ? dayjs(todosData.dueDate) : null}
              onChange={(newValue) => {
                setTodosData({
                  ...todosData,
                  dueDate: newValue
                    ? newValue.format("YYYY-MM-DD").toString()
                    : "",
                });
              }}
            />
          </LocalizationProvider>

          <FormControl size="small">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              label="Priority"
              value={todosData.priority}
              onChange={handlePriorityChange}
              required={true}
            >
              <MenuItem value={Priority.Low}>Low</MenuItem>
              <MenuItem value={Priority.Medium}>Medium</MenuItem>
              <MenuItem value={Priority.High}>High</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            disabled={
              !todosData.title ||
              !todosData.description ||
              !todosData.dueDate ||
              !todosData.priority
            }
            onClick={handleAddTodo}
          >
            Add Todo
          </Button>
        </Box>
      </Box>
      {/* todo-list */}
      {todos.length > 0 && (
        <Typography sx={{ textAlign: "center", mt: 6 }} variant="h5">
          My Todos
        </Typography>
      )}

      <TodoList />
    </Box>
  );
};

export default TodoForm;
