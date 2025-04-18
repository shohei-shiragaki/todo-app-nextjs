import React from "react";
import DetailPage from "@/screen/detail-page";
import { getTodoById } from "@/todo-api";
import Loading from "@/component/loading";

// page.tsxのページを表す関数はPascalCaseで記載するのが一般的です。
// https://github.com/nextjs/saas-starter/blob/main/app/(dashboard)/dashboard/page.tsx#L5
const page = async({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const todoData = await getTodoById(id);
    if (!todoData) {
        // delayさせる意味は何でしょうか？加えて、5000という数値を選んだ根拠はありますか？
        // setTimeoutを無駄に使うといつどんな処理が実行されるか分かりづらいのでどうしても必要なシーン以外はあまり使わない方が良いです。
        // ローディング関連の処理はnext.jsが色々と提供してるので自前実装しない方が良いです。
        // 以下をはじめ、関連する記事を読んで情報を集めてみてください。（できれば公式documentを読むといいです）
        // https://zenn.dev/takumaaa/articles/de748961c2643e
        return delay(5000).then(() => <Loading />);
    }
    return (
        <DetailPage todo={todoData}/>
    )
};


export default page;
