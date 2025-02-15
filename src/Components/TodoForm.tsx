import { useEffect, useState } from "react";
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
import { Priority, TodoItem } from "../Context/type";
import { isTodoDisabled } from "./utils";

const generateId = () => Date.now().toString();
const TodoForm = () => {
  const { addTodo, todos, editTodo, updateTodo, setEditTodo } = useTodos();
  const [todosData, setTodosData] = useState<TodoItem>({
    id: "",
    title: "",
    description: "",
    completed: false,
    dueDate: "",
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

  useEffect(() => {
    if (editTodo) {
      setTodosData(editTodo);
    }
  }, [editTodo]);
  const handleAddTodo = () => {
    if (editTodo) {
      updateTodo({ ...todosData, id: editTodo.id });
      setEditTodo(null);
      alert("Todo updated successfully");
    } else {
      addTodo({ ...todosData, id: generateId() });
      alert("Todo added successfully");
    }
    resetForm();
  };

  const resetForm = () => {
    setTodosData({
      id: "",
      title: "",
      description: "",
      completed: false,
      dueDate: "",
      priority: Priority.Medium,
    });
  };

  const handleEditCancel = () => {
    setEditTodo(null);
    resetForm();
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
              minDate={dayjs()}
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
              <MenuItem value={Priority.Low}>{Priority.Low}</MenuItem>
              <MenuItem value={Priority.Medium}>{Priority.Medium}</MenuItem>
              <MenuItem value={Priority.High}>{Priority.High}</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              disabled={isTodoDisabled(todosData)}
              onClick={handleAddTodo}
            >
              {editTodo ? "Update Todo" : "Add Todo"}
            </Button>
            {editTodo && (
              <Button
                variant="outlined"
                onClick={() => {
                  handleEditCancel();
                }}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TodoForm;
