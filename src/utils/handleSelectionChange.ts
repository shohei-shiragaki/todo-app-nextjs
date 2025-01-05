"use client"
import { Todo } from "@/types";
import { GridCallbackDetails, GridRowSelectionModel } from "@mui/x-data-grid";

export const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails<any>) => {
    console.log('選択された行:', rowSelectionModel);
    // const todos = details.todos;
    // 選択された行の値を取得する
    // const selectedRows = rowSelectionModel.map((id: string)=> {
    //   return todos.find((todo:Todo) => todo.id === id;
    // });
    // console.log('選択された行の値:', rowSelectionModel[0].valueOf());
    // console.log('選択された行の値:', rowSelectionModel);
  };