import EditPage from "@/app/component/EditPage";
import { Todo } from "@/types";

type PageProps = {
    params: Promise<{ id: number }>;
};

const fetchTodo = async (id: number): Promise<Todo> => {
    const response = await fetch(`https://todo-api-aa9t.onrender.com/todos/${id}`, { cache: 'no-store' });
    const todo: Todo = await response.json();
    return todo;
};

const page = async (params: PageProps) =>{
    const  id  = Number((await params.params).id);
    const todo = await fetchTodo(id);
    return <EditPage todo={todo} />
};

export default page;