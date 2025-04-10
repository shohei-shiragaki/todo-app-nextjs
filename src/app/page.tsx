import TodoList from "@/component/todo-list";
import { getAllTodos } from "@/todo-api";


export default async function Home() {

  const todoList = await getAllTodos()

  return (
    <div className="md:flex">
      <div className="container mx-auto">
        <div suppressHydrationWarning>
          <TodoList todos={todoList} />
        </div>
      </div>
    </div>
  );
}
