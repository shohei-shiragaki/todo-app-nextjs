import { Todo } from "@/types";

const todoListMock = () => {
  const todos: Todo[] = [
    { id: "test1", title: "Todo 1", detail: "Detail 1", deadline: "2025-01-01", status: "完了" },
    { id: "test2", title: "Todo 2", detail: "Detail 2", deadline: "2025-01-15", status: "未完了" },
    // 必要に応じて Todo を追加する
  ];

  return todos;
};

export default todoListMock;