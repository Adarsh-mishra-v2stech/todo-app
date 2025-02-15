import { TodoItem } from "../Context/type";

export const isTodoDisabled = (todo: Partial<TodoItem>): boolean => {
  return !todo.title || !todo.description || !todo.dueDate || !todo.priority;
};
