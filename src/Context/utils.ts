import { DateRange, TodoItem } from "./type";

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
  return [...todos]
    .filter((todo) => {
      const todoDate = new Date(todo.dueDate).getTime();
      return (
        (!dateRange.start || todoDate >= new Date(dateRange.start).getTime()) &&
        (!dateRange.end || todoDate <= new Date(dateRange.end).getTime())
      );
    })
    .filter((todo) => {
      return todo.title.toLowerCase().includes(searchTitle.toLowerCase());
    })
    .filter((todo) => {
      if (completedStatus === "All") return true;
      return completedStatus === "Yes" ? todo.completed : !todo.completed;
    })
    .sort((a, b) => {
      if (sortByPriority) {
        return sortByPriority === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return sortByTitle === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
};

export const getInitialTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const setTodosLocal = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
