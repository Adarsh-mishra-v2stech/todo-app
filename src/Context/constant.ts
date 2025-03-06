import { Priority } from "./type";

export const TODO_ACTIONS_TYPE = {
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  DUPLICATE_TODO: "DUPLICATE_TODO",
} as const;

export const PRIORITY_ORDER = { High: 1, Medium: 2, Low: 3 };

export const STATIC_TODOS = [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    priority: Priority.High,
    dueDate: new Date().toISOString().split("T")[0],
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    priority: Priority.Medium,
    dueDate: new Date().toISOString().split("T")[0],
    completed: true,
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description 3",
    priority: Priority.Low,
    dueDate: new Date().toISOString().split("T")[0],
    completed: false,
  },
];
