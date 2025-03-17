"use client";

import { Todo } from "@/types";
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRowSelectionModel, GridRowParams } from '@mui/x-data-grid';
import { renderMyButton } from "@/utils/renderMyButton";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from 'next/navigation';
import { deleteTodoList, getPersistentEffort } from "@/todoAPI";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ja';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

type TodoListProps = {
  todos: Todo[];
};

const TodoList = ({ todos }: TodoListProps) => {
  const [todoData, setTodoData] = useState<Todo[]>(todos || []);
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);
  const [selectTodos, setSelectTodos] = useState<Todo[]>([]);
  const router = useRouter();
  const deleteButtonDisabled = selectedIds.length === 0 ? true : false;
  const columns: GridColDef[] = [
    { 
      field: 'title', 
      headerName: 'タイトル', 
      flex: 1
    },
    { 
      field: 'deadline',
      headerName: '締切日',
      flex: 1,
      valueFormatter: (params) => {
        if (!params) return "";
        return dayjs(params).format('YYYY/MM/DD HH:mm');
      },
    },
    { 
      field: 'status',
      headerName: 'ステータス',
      flex: 1,
      renderCell: (params) => {return params.value ? '完了' : '未完了';}
    },
    {
      field: '',
      headerName: '',
      sortable: false,
      flex: 0.3, 
      renderCell: renderMyButton
    },
  ];

  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    setSelectedIds(selectionModel);
    setSelectTodos(todoData.filter(todo => selectionModel.includes(todo.id)));
  };

  const handleDelete = async () => {
    try {
      const response = await deleteTodoList(selectTodos);
      if (response.ok) {
        console.log('削除に成功しました');
        router.refresh();
      } else {
        const errorData = await response.json();
        console.error('削除に失敗しました:', errorData);
      }
    } catch (error) {
      console.error('リクエスト中にエラーが発生しました:', error);
    }
  };

  const getRowClassName = (params: GridRowParams) => {
    const deadline = dayjs(params.row.deadline);
    const isPastDeadline = deadline.isBefore(dayjs()) && !params.row.status;
    return isPastDeadline ? 'past-deadline' : '';
  };

  useEffect(() => {
    setTodoData(todos);
    const interval = setInterval(async () => {
      try {
        const data = await getPersistentEffort();
        console.log('Persistent Effort Data:', data);
      } catch (error) {
        console.error('Persistent Effort API call failed:', error);
      }
    }, 12 * 60 * 1000); // 12分ごとに実行

    return () => clearInterval(interval);
  }, [todos]);

  return (
    <>
      <Box 
        component="div"
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mt: 4,
          '& > *': { m: 1 }  // 子要素のマージン
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('./todo-create')}
          sx={{ mr: 2 }}
        >
          登録する
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          disabled={deleteButtonDisabled}
        >
          削除
        </Button>
      </Box>
      <Paper 
        elevation={3}
        sx={{ 
          height: 400, 
          width: '100%', 
          backgroundColor: 'background.paper',
          mt: 2,
          '& .past-deadline': {
            color: 'red',
          }
        }}
      >
        <DataGrid
          rows={todoData}
          columns={columns}
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleSelectionChange}
          getRowClassName={getRowClassName}
          initialState={{
            sorting: {
              sortModel: [{ field: 'deadline', sort: 'asc' }],
            },
          }}
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none', // フォーカス時のアウトラインを非表示にする
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none', // 編集中のアウトラインを非表示にする
            },
          }}
        />
      </Paper>
    </>
  );
};

export default TodoList;
