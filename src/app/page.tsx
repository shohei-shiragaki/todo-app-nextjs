import TodoList from "./component/TodoList";
import todoListMock from "./component/todoListMock";
import Link from 'next/link';

export default function Home() {
  const todoList = todoListMock();
  return (
    <div className="md:flex">
      <div className="container mx-auto">
        <div className="flex justify-end m-5">
          <Link href="./createTodo" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            TODOを登録
          </Link>
        </div>
        <TodoList
          todos={todoList}
        />
      </div>
    </div>
  );
}
