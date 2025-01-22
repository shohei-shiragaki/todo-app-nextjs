import { getAllTodos } from "@/todoAPI";
import TodoList from "./component/TodoList";

export default async function Home() {
  console.log('before getAllTodos');
  const todoList = await getAllTodos()
  console.log('after getAllTodos');
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
