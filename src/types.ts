export type Todo = {
  id: string;
  title: string;
  detail: string | null;
  deadline: string;
  status: boolean;
  create_date: string;
};

export type TodoCreate = Omit<Todo, "id">;
