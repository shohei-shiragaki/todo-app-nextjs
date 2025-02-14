import EditPage from "@/app/component/EditPage";
import { getTodoById } from "@/todoAPI";
import { Todo } from "@/types";

const page = async ({ params }: { params: Promise<{ id: Todo["id"] }> }) => {
    const { id } = await params;
    const todo = await getTodoById(id);
    return <EditPage todo={todo} />
};

export default page;