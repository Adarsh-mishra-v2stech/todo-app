import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useState,
  useMemo,
  useEffect,
} from "react";
import { DateRange, TodoContextType, TodoItem } from "./type";
import todoReducer, {
  addTodoAction,
  deleteTodoAction,
  duplicateTodoAction,
  toggleTodoAction,
  updateTodoAction,
} from "./todoReducer";
import { sortFilterTodo } from "./utils";
import { PRIORITY_ORDER } from "./constant";
import { getInitialTodos, setTodosLocal } from "./utils";
import { STATIC_TODOS } from "./constant";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  // get initial todos from local storage
  const initialState = getInitialTodos();

  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [editTodo, setEditTodo] = useState<TodoItem | null>(null);
  const [sortByTitle, setSortByTitle] = useState<string>("");
  const [sortByPriority, setSortByPriority] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [completedStatus, setCompletedStatus] = useState<string>("All");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: "",
    end: "",
  });

  // Saving the todos to local storage
  useEffect(() => {
    setTodosLocal("todos", todos);
  }, [todos]);

  // Sorting and filtering todos
  const sortedFilteredTodos = useMemo(() => {
    return sortFilterTodo({
      todos,
      dateRange,
      searchTitle,
      priorityOrder: PRIORITY_ORDER,
      sortByPriority,
      sortByTitle,
      completedStatus,
    });
  }, [
    todos,
    dateRange,
    searchTitle,
    sortByPriority,
    sortByTitle,
    completedStatus,
  ]);

  // Context value
  const value: TodoContextType = {
    todos: sortedFilteredTodos,
    addTodo: (todo) => dispatch(addTodoAction(todo)),
    deleteTodo: (id) => dispatch(deleteTodoAction(id)),
    toggleTodo: (id) => dispatch(toggleTodoAction(id)),
    updateTodo: (todo) => dispatch(updateTodoAction(todo)),
    duplicateTodo: (todo) => dispatch(duplicateTodoAction(todo)),
    setEditTodo,
    editTodo,
    dateRange,
    setDateRange,
    sortByTitle,
    setSortByTitle,
    searchTitle,
    setSearchTitle,
    setSortByPriority,
    sortByPriority,
    completedStatus,
    setCompletedStatus,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within a TodoProvider");
  return context;
};

export default TodoProvider;

export { TodoContext };
