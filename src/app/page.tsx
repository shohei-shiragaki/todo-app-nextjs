import { getAllTodos } from "@/todoAPI";
import TodoList from "./component/TodoList";

export default async function Home() {

  // 全TODO取得APIを呼び出す
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
