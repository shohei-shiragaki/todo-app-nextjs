"use client"
import { GridRenderCellParams } from '@mui/x-data-grid';
import Link from 'next/link';

export const renderMyButton = (params: GridRenderCellParams) => {
  console.log('選択された行:', params.id);
  return (
    <Link href={`./todo-detail/${params.id}`}>詳細</Link>
  );
};