import { getAllTodos } from "@/todoAPI";
import TodoList from "./component/TodoList";

export default async function Home() {
  const todoList = await getAllTodos()
  return (
    <div className="md:flex">
      <div className="container mx-auto">
        <TodoList
          todos={todoList}
        />
      </div>
    </div>
  );
}
