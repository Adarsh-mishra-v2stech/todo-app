import { TODO_ACTIONS_TYPE } from "./constant";

export enum Priority {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
}

export type TodoActionType =
  | { type: typeof TODO_ACTIONS_TYPE.ADD_TODO; payload: TodoItem }
  | { type: typeof TODO_ACTIONS_TYPE.DELETE_TODO; payload: string }
  | { type: typeof TODO_ACTIONS_TYPE.TOGGLE_TODO; payload: string }
  | { type: typeof TODO_ACTIONS_TYPE.UPDATE_TODO; payload: TodoItem }
  | { type: typeof TODO_ACTIONS_TYPE.DUPLICATE_TODO; payload: TodoItem }
  | { type: "SET_TODOS"; payload: TodoItem[] };

export type TodoContextType = {
  todos: TodoItem[];
  addTodo: (todo: TodoItem) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (todo: TodoItem) => void;
  setEditTodo: (todo: TodoItem | null) => void;
  editTodo: TodoItem | null;
  duplicateTodo: (todo: TodoItem) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  sortByTitle: string;
  searchTitle: string;
  setSearchTitle: (title: string) => void;
  setSortByTitle: (order: string) => void;
  setSortByPriority: (order: string) => void;
  sortByPriority: string;
  completedStatus: string;
  setCompletedStatus: (status: string) => void;
};

export interface DateRange {
  start: string;
  end: string;
}
