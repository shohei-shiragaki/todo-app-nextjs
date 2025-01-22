import { Todo } from "./types";

export const getAllTodos = async (): Promise<Todo[]> => {
    console.log('before fetch');
    const res = await fetch('https://todo-api-aa9t.onrender.com', { cache: 'no-store' });
    console.log('after fetch');
    const todos = await res.json();
    console.log('getAllTodos', todos);
    return todos;
};

export const getTodoById = async (id: string): Promise<Todo> => {
    const res = await fetch(`https://todo-api-aa9t.onrender.com/updateTodo/${id}`, { cache: 'no-store' });
    const todos = await res.json();
    return todos;
};