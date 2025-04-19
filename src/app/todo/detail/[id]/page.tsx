import React, { Suspense } from "react";
import DetailScreen from "@/screen/detail-screen";
import { getTodoById } from "@/todo-api";

const DetailPage = async({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;
    const todoData = await getTodoById(id);
    return (
        <DetailScreen todo={todoData}/>
    )
};

export default DetailPage;
