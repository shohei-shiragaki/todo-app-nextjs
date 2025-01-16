import { Todo } from "@/types";
import React from "react";

const page = async({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const response = await fetch(`https://todo-api-aa9t.onrender.com/todos/${id}`, { cache: 'no-store' });
    const todo: Todo = await response.json();
    return (
        <div className="text-center text-white">
            <div>{todo.id}</div>
            <div>{todo.title}</div>
            <div>{todo.detail}</div>
            <div>{todo.deadline}</div>
            <div>{todo.status}</div>
        </div>
    )
};

export default page;
