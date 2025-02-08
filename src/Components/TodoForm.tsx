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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { Priority } from "../Context/type";

const TodoForm = () => {
  const { addTodo, todos } = useTodos();
  const [todosData, setTodosData] = useState({
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
      priority: e.target.value as Priority,
    });
  };

  const handleAddTodo = () => {
    addTodo(todosData);
    alert("Todo added successfully");
    setTodosData({
      title: "",
      description: "",
      completed: false,
      dueDate: "",
      priority: Priority.Medium,
    });
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        component="form"
        sx={{
          display: "grid",
          width: "500px",
          gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
          gap: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Title"
          size="small"
          name="title"
          value={todosData.title}
          onChange={handleTodosChange}
        />
        <TextField
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
            slotProps={{ textField: { size: "small" } }}
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
          >
            <MenuItem value={Priority.Low}>Low</MenuItem>
            <MenuItem value={Priority.Medium}>Medium</MenuItem>
            <MenuItem value={Priority.High}>High</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </Box>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
          <p>{todo.description}</p>
          <p>{todo.dueDate}</p>
          <p>{todo.priority}</p>
        </div>
      ))}
    </Box>
  );
};

export default TodoForm;
