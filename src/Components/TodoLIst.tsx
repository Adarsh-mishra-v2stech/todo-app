import { useTodos } from "../Context/useTodoContext";
import TodoItems from "./TodoItem";

const TodoList = () => {
  const { todos } = useTodos();

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItems key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
