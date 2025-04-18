'use client';

import { Todo } from "@/types";
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRowSelectionModel, GridRowParams } from '@mui/x-data-grid';
import { MyButton } from "@/component/my-button";
import {  useState } from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from 'next/navigation';
import { deleteTodoList } from "@/todo-api";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { jaJP } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import 'dayjs/locale/ja';
import Loading from "./loading";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

type TodoListProps = {
  todos: Todo[];
};

const TodoList = ({ todos }: TodoListProps) => {
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
      renderCell: MyButton
    },
  ];

  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    setSelectedIds(selectionModel);
    setSelectTodos(todos.filter(todo => selectionModel.includes(todo.id)));
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
  
  const theme = createTheme({}, jaJP);

  return todos === undefined ? <Loading /> : (
    <>
      <Box 
        component="div"
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mt: 4,
          '& > *': { m: 1 } 
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('./todo-create')}
          sx={{ mr: 2, height: '36px', width: '100px' }}
        >
          登録する
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          disabled={deleteButtonDisabled}
          sx={{ mr: 2, height: '36px', width: '100px' }}
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
        {/* この場所でThemeProviderを呼ぶのはかなりレアです。この配下だけテーマを適用したい明確な意図があればいいですが、一般的に（ほとんどの場合）アプリ全体にテーマを適用します。 */}
        {/* ちょっと違和感が大きいので直した方が良いと思います。 */}
        {/* https://zenn.dev/longbridge/articles/c100d0311ed1be#%E6%98%8E%E7%A4%BA%E7%9A%84%E3%81%AB%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E5%85%A8%E4%BD%93%E3%81%AB%E3%83%86%E3%83%BC%E3%83%9E%E3%82%92%E9%81%A9%E7%94%A8%E3%81%99%E3%82%8B */}
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={todos}
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
                outline: 'none', 
              },
              '& .MuiDataGrid-cell:focus-within': {
                outline: 'none', // 編集中のアウトラインを非表示にする
              },
            }}
            localeText={{
              columnMenuSortAsc: '昇順でソート',
              columnMenuSortDesc: '降順でソート',
              columnMenuFilter: 'フィルター',
              columnMenuHideColumn: '列を隠す',
              columnMenuShowColumns: '列を表示',
              columnMenuManageColumns: '列の管理',
              columnMenuUnsort: 'ソート解除',
            }}
          />
      </ThemeProvider>
    </Paper>
    </>
  );
};

export default TodoList;
