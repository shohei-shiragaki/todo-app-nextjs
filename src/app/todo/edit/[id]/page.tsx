import EditScreen from "@/screen/edit-screen";
import { getTodoById } from "@/todo-api";
import { Todo } from "@/types";

const EditPage = async ({ params }: { params: Promise<{ id: Todo["id"] }> }) => {
    const { id } = await params;
    const todo = await getTodoById(id);
    return <EditScreen todo={todo} />
};

export default EditPage;