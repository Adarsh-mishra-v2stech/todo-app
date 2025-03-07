import { useEffect } from "react";
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
import { isTodoDisabled } from "./utils";
import SnackbarComponent from "./SnackbarComponent";
import useSnackbar from "../hook/useSnackbar";
import { useTodoForm } from "../hook/useTodoForm";

const TodoForm = () => {
  const { editTodo, setEditTodo } = useTodos();
  const { snackbarState, openSnackbar, closeSnackbar } = useSnackbar();
  const {
    formik: {
      handleChange,
      handleSubmit,
      values,
      setFieldValue,
      errors,
      resetForm,
      touched,
      setFieldTouched,
    },
  } = useTodoForm({
    openSnackbar,
    setEditTodo,
    editTodo,
  });

  useEffect(() => {
    if (editTodo) {
      setFieldValue("title", editTodo.title);
      setFieldValue("description", editTodo.description);
      setFieldValue("dueDate", editTodo.dueDate);
      setFieldValue("priority", editTodo.priority);
    }
  }, [editTodo, setFieldValue]);

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
            label="Title"
            size="small"
            name="title"
            value={values.title}
            onChange={(e) => {
              setFieldTouched("title", true);
              handleChange(e);
            }}
            onBlur={() => setFieldTouched("title")}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
          />
          <TextField
            label="Description"
            size="small"
            name="description"
            multiline
            value={values.description}
            onChange={(e) => {
              setFieldTouched("description", true);
              handleChange(e);
            }}
            onBlur={() => setFieldTouched("description")}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              slotProps={{
                textField: {
                  size: "small",
                  required: true,
                  error: Boolean(touched.dueDate && errors.dueDate),
                  helperText: touched.dueDate && errors.dueDate,
                  onBlur: () => setFieldTouched("dueDate"),
                },
              }}
              name="dueDate"
              value={values.dueDate ? dayjs(values.dueDate) : null}
              minDate={dayjs()}
              onChange={(newValue) => {
                setFieldValue(
                  "dueDate",
                  newValue ? newValue.format("YYYY-MM-DD").toString() : ""
                );
              }}
            />
          </LocalizationProvider>

          <FormControl size="small">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              label="Priority"
              value={values.priority}
              onChange={handleChange}
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
              onClick={() => {
                handleSubmit();
              }}
            >
              {editTodo ? "Update Todo" : "Add Todo"}
            </Button>
            {editTodo && (
              <Button variant="outlined" onClick={handleEditCancel}>
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <SnackbarComponent
        open={snackbarState.open}
        message={snackbarState.message}
        severity={snackbarState.severity}
        onClose={closeSnackbar}
      />
    </Box>
  );
};

export default TodoForm;
