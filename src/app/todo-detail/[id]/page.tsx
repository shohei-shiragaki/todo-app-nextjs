import React from "react";
import DetailPage from "@/app/component/DetailPage";

const page = async({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;

    return (
        <DetailPage id={id}/>
    )
};


export default page;
