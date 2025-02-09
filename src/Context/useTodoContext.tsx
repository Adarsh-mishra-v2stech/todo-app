import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useState,
} from "react";
import { TodoItem } from "./type";

type TodoActionType =
  | { type: "ADD_TODO"; payload: TodoItem }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "UPDATE_TODO"; payload: TodoItem };

type TodoContextType = {
  todos: TodoItem[];
  addTodo: (todo: TodoItem) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (todo: TodoItem) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const todoReducer = (state: TodoItem[], action: TodoActionType): TodoItem[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );

    default:
      return state;
  }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const value: TodoContextType = {
    todos,
    addTodo: (todo) => dispatch({ type: "ADD_TODO", payload: { ...todo } }),
    deleteTodo: (id) => dispatch({ type: "DELETE_TODO", payload: id }),
    toggleTodo: (id) => dispatch({ type: "TOGGLE_TODO", payload: id }),
    updateTodo: (todo) => dispatch({ type: "UPDATE_TODO", payload: todo }),
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within a TodoProvider");
  return context;
};
