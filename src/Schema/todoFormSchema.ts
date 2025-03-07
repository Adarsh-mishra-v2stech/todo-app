import * as yup from "yup";
import { Priority } from "../Context/type";

export const todoFormSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must have at least 3 characters")
    .max(50, "Title must have at most 50 characters")
    .matches(/^[a-zA-Z0-9\s]+$/, "Title cannot contain special characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must have at least 10 characters")
    .max(200, "Description must have at most 200 characters"),
  dueDate: yup.date().required("Due Date is required").nullable(),
  priority: yup.string().oneOf(Object.values(Priority)).required(),
});
