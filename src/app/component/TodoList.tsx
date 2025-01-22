"use client";

import { Todo } from "@/types";
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { renderMyButton } from "@/utils/renderMyButton";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from 'next/navigation';

type TodoListProps = {
  todos: Todo[];
};

const TodoList = ({ todos }: TodoListProps) => {
  console.log("TodoList", todos);
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);
  const [selectTodos, setSelectTodos] = useState<Todo[]>([]);
  const router = useRouter();
  const deleteButtonDisabled = selectedIds.length === 0 ? true : false;
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'タイトル', width: 350 },
    { field: 'deadline', headerName: '締切日', width: 200 },
    { 
      field: 'status',
      headerName: 'ステータス',
      width: 200,
      renderCell: (params) => {return params.value ? '完了' : '未完了';}
    },
    {
      field: '',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: renderMyButton
    },
  ];

  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    setSelectedIds(selectionModel);
    setSelectTodos(todos.filter(todo => selectionModel.includes(todo.id)));
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('https://todo-api-aa9t.onrender.com/todo-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectTodos),
      });
      if (response.ok) {
        console.log('削除に成功しました');
        router.refresh();
        // 必要に応じて、削除後の処理を追加します
      } else {
        const errorData = await response.json();
        console.error('削除に失敗しました:', errorData);
      }
    } catch (error) {
      console.error('リクエスト中にエラーが発生しました:', error);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Box className="m-5">
          <Button
            variant="contained"
            color="primary"
            className="text-white hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => router.push('./todo-create')}
            sx={{ mr: 2 }}
            >
            登録する
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="text-white"
            onClick={handleDelete}
            disabled={deleteButtonDisabled}
            >
            削除
          </Button>
        </Box>
      </Box>
      <Paper sx={{ height: 400, width: '100%', backgroundColor:  'White' }}>
        <DataGrid
          rows={todos}
          columns={columns}
          // initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection={true}
          disableRowSelectionOnClick={true}
          onRowSelectionModelChange={handleSelectionChange}
          sx={{ border: 0 }}
        />
      </Paper>
    </>

  );
};

export default TodoList;
