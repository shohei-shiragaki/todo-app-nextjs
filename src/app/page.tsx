import { getAllTodos } from "@/todoAPI";
import TodoList from "./component/TodoList";
import Link from 'next/link';

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
