import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useState,
} from "react";
import { TodoContextType, TodoItem } from "./type";
import todoReducer, {
  addTodoAction,
  deleteTodoAction,
  toggleTodoAction,
  updateTodoAction,
} from "./todoReducer";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [editTodo, setEditTodo] = useState<TodoItem | null>(null);

  const value: TodoContextType = {
    todos,
    addTodo: (todo) => dispatch(addTodoAction(todo)),
    deleteTodo: (id) => dispatch(deleteTodoAction(id)),
    toggleTodo: (id) => dispatch(toggleTodoAction(id)),
    updateTodo: (todo) => dispatch(updateTodoAction(todo)),
    setEditTodo,
    editTodo,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within a TodoProvider");
  return context;
};
