import { TodoItem, TodoActionType } from "./type";
import { TODO_ACTIONS_TYPE } from "./constant";

const todoReducer = (state: TodoItem[], action: TodoActionType): TodoItem[] => {
  switch (action.type) {
    case TODO_ACTIONS_TYPE.ADD_TODO:
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

export default todoReducer;
