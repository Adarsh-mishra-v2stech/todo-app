import { DateRange, TodoItem } from "./type";
import { STATIC_TODOS } from "./constant";

// Utility function to filter todos by date range
const filterByDateRange = (
  todos: TodoItem[],
  dateRange: DateRange
): TodoItem[] => {
  return todos.filter((todo) => {
    const dueDate = new Date(todo.dueDate);
    return (
      (!dateRange.start || dueDate >= new Date(dateRange.start)) &&
      (!dateRange.end || dueDate <= new Date(dateRange.end))
    );
  });
};

// Utility function to filter todos by title
const filterByTitle = (todos: TodoItem[], searchTitle: string): TodoItem[] => {
  const lowerCaseSearchTitle = searchTitle.toLowerCase();
  return todos.filter((todo) =>
    todo.title.toLowerCase().includes(lowerCaseSearchTitle)
  );
};

// Utility function to filter todos by completion status
const filterByCompletionStatus = (
  todos: TodoItem[],
  completedStatus: string
): TodoItem[] => {
  if (completedStatus === "All") return todos;
  const isCompleted = completedStatus === "Yes";
  return todos.filter((todo) => todo.completed === isCompleted);
};

// Utility function to sort todos
const sortTodos = (
  todos: TodoItem[],
  priorityOrder: { [key: string]: number },
  sortByPriority: string,
  sortByTitle: string
): TodoItem[] => {
  return todos.sort((a, b) => {
    if (sortByPriority) {
      const priorityComparison =
        sortByPriority === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityComparison !== 0) return priorityComparison;
    }
    return sortByTitle === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });
};

// Main function to filter and sort todos
export const sortFilterTodo = ({
  todos,
  dateRange,
  searchTitle,
  priorityOrder,
  sortByPriority,
  sortByTitle,
  completedStatus,
}: {
  todos: TodoItem[];
  dateRange: DateRange;
  searchTitle: string;
  priorityOrder: { [key: string]: number };
  sortByPriority: string;
  sortByTitle: string;
  completedStatus: string;
}) => {
  let filteredTodos = filterByDateRange(todos, dateRange);
  filteredTodos = filterByTitle(filteredTodos, searchTitle);
  filteredTodos = filterByCompletionStatus(filteredTodos, completedStatus);
  return sortTodos(filteredTodos, priorityOrder, sortByPriority, sortByTitle);
};

// Function to get initial todos from local storage
export const getInitialTodos = (): TodoItem[] => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    const parsedTodos = JSON.parse(storedTodos);
    return parsedTodos.length === 0
      ? [...parsedTodos, ...STATIC_TODOS]
      : parsedTodos;
  }
  return STATIC_TODOS;
};

// Function to set todos in local storage
export const setTodosLocal = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
