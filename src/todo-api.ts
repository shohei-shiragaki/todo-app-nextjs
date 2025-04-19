import { Todo, TodoCreate } from "./types";

const apiBaseUrls = process.env.NEXT_PUBLIC_API_BASE_URLS?.split(',') || [];
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT
const apiBaseUrl = environment==='production' ? apiBaseUrls[0] : apiBaseUrls[1]; 

if (!apiBaseUrl) {
    throw new Error("環境変数 apiBaseUrl が設定されていません");
}

export const getAllTodos = async (): Promise<Todo[]> => {

    const res = await fetch(`${apiBaseUrl}/todos`, { cache: 'no-store' });
    const todos:Todo[] = await res.json();
    return todos;

};

export const getTodoById = async (id: string): Promise<Todo> => {

    const res = await fetch(`${apiBaseUrl}/todo/${id}`, { cache: 'no-store' });
    const todo:Todo = await res.json();
    return todo;

};

export const deleteTodoList = async (selectTodos: Todo[]) : Promise<Response> => {
    
    const res = await fetch(`${apiBaseUrl}/todos/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectTodos),
    });
    return res;

}

export const updateTodo = async (id:string, req:Todo) : Promise<Response> => {

    const res = await fetch(`${apiBaseUrl}/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
    return res;
};

export const createTodo = async (req:TodoCreate) : Promise<Response> => {

    const res = await fetch(`${apiBaseUrl}/todo/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    });
    return res;
  
}
