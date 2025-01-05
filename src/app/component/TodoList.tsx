import { Todo } from "@/types";
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { handleSelectionChange } from "@/utils/handleSelectionChange";
import { renderMyButton } from "@/utils/renderMyButton";

type TodoListProps = {
  todos: Todo[];
};


const TodoList = ({ todos }: TodoListProps) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'タイトル', width: 350 },
    // { field: 'detail', headerName: '詳細', width: 350 },
    { field: 'deadline', headerName: '締切日', width: 200 },
    { field: 'status', headerName: 'ステータス', width: 200 },
    {
      field: '',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: renderMyButton
    },
  ];


  return (
    <>
      <Paper sx={{ height: 400, width: '100%' }}>
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
