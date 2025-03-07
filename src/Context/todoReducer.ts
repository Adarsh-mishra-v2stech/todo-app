import { TodoItem, TodoActionType } from "./type";
import { TODO_ACTIONS_TYPE } from "./constant";

// Reducer Function
const todoReducer = (state: TodoItem[], action: TodoActionType): TodoItem[] => {
  switch (action.type) {
    case TODO_ACTIONS_TYPE.ADD_TODO:
      console.log(" action.payload", action.payload);
      return [...state, action.payload];
    case TODO_ACTIONS_TYPE.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case TODO_ACTIONS_TYPE.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case TODO_ACTIONS_TYPE.UPDATE_TODO:
      return state.map((todo: TodoItem) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    case TODO_ACTIONS_TYPE.DUPLICATE_TODO:
      const original = state.find((todo) => todo.id === action.payload.id);
      if (!original) return state;

      return [
        {
          ...original,
          id: Date.now().toString(),
          title: `${original.title}_copy`,
          dueDate: new Date().toISOString().split("T")[0],
        },
        ...state,
      ];

    default:
      return state;
  }
};

// Actions Functions
export const addTodoAction = (todo: TodoItem) => {
  return {
    type: TODO_ACTIONS_TYPE.ADD_TODO,
    payload: { ...todo },
  } as const;
};

export const deleteTodoAction = (id: string) => {
  return {
    type: TODO_ACTIONS_TYPE.DELETE_TODO,
    payload: id,
  } as const;
};

export const toggleTodoAction = (id: string) => {
  return {
    type: TODO_ACTIONS_TYPE.TOGGLE_TODO,
    payload: id,
  } as const;
};

export const updateTodoAction = (todo: TodoItem) => {
  return {
    type: TODO_ACTIONS_TYPE.UPDATE_TODO,
    payload: todo,
  } as const;
};

export const duplicateTodoAction = (todo: TodoItem) => {
  return {
    type: TODO_ACTIONS_TYPE.DUPLICATE_TODO,
    payload: todo,
  } as const;
};

export default todoReducer;
