import React from "react";
import DetailPage from "@/app/component/DetailPage";
import { getTodoById } from "@/todoAPI";

const page = async({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;
    const todoData = await getTodoById(id);

    return (
        <DetailPage todo={todoData}/>
    )
};


export default page;
