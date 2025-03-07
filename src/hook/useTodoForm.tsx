import { useFormik } from "formik";
import { useTodos } from "../Context/useTodoContext";
import { Priority, TodoItem } from "../Context/type";
import { generateId } from "../Components/utils";
import { todoFormSchema } from "../Schema/todoFormSchema";

export const useTodoForm = ({
  openSnackbar,
  setEditTodo,
  editTodo,
}: {
  openSnackbar: (message: string, type: "success" | "error") => void;
  setEditTodo: Function;
  editTodo: TodoItem | null;
}) => {
  const { addTodo, updateTodo } = useTodos();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      dueDate: "",
      priority: Priority.Medium,
    },
    validationSchema: todoFormSchema,
    onSubmit: (values, { resetForm }) => {
      if (editTodo) {
        updateTodo({
          ...values,
          id: editTodo.id,
          completed: false,
        });
        openSnackbar("Todo updated successfully", "success");
        setEditTodo(null);
      } else {
        addTodo({
          ...values,
          id: generateId(),
          completed: false,
        });
        openSnackbar("Todo added successfully", "success");
      }

      resetForm();
    },
    enableReinitialize: true,
  });

  return {
    formik,
  };
};
