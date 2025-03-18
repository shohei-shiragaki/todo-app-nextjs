import React from "react";
import DetailPage from "@/app/component/DetailPage";
import { getTodoById } from "@/todoAPI";
import Loading from "@/app/Loading";

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
