import EditPage from "@/screen/edit-page";
import { getTodoById } from "@/todo-api";
import { Todo } from "@/types";

const page = async ({ params }: { params: Promise<{ id: Todo["id"] }> }) => {
    const { id } = await params;
    const todo = await getTodoById(id);
    return <EditPage todo={todo} />
};

export default page;