import React from "react";
import DetailPage from "@/screen/detail-page";
import { getTodoById } from "@/todo-api";
import Loading from "@/component/loading";

const page = async({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const todoData = await getTodoById(id);
    if (!todoData) {
        return delay(5000).then(() => <Loading />);
    }
    return (
        <DetailPage todo={todoData}/>
    )
};


export default page;
