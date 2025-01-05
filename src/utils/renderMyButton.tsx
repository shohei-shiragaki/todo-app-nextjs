"use client"
import { Button } from '@mui/material';
import { GridCallbackDetails, GridRenderCellParams, GridRowSelectionModel } from '@mui/x-data-grid';
import Link from 'next/link';

// type Props = {
//   text: string;
//   onClick: () => void;
// }

// type Props = {
//   rowSelectionModel: GridRowSelectionModel;
// };

export const renderMyButton = (params: GridRenderCellParams) => {
  console.log('選択された行:', params.id);
  return (
    <Link href={`./updateTodo/${params.id}`}>詳細</Link>
  );
};