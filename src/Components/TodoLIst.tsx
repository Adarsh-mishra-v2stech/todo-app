import { Typography } from "@mui/material";
import { useTodos } from "../Context/useTodoContext";
import TodoItems from "./TodoItem";

const TodoList = () => {
  const { todos } = useTodos();

  if (todos.length === 0)
    return (
      <Typography variant="h6" sx={{ textAlign: "center", my: 4 }}>
        No todos found
      </Typography>
    );

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItems key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
