import { Todo } from "./types";

export const getAllTodos = async (): Promise<Todo[]> => {
    const res = await fetch('https://todo-api-aa9t.onrender.com', { cache: 'no-store' });
    const todos = await res.json();
    return todos;
};