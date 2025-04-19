"use client"
import { Button } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import Link from 'next/link';

export const MyButton = (params: GridRenderCellParams) => {
  return (
    <Link 
      href={`/todo/detail/${params.id}`}
      style={{ textDecoration: 'none' }}
    >
      <Button
        variant="contained"
        size="small"
        sx={{
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        詳細
      </Button>
    </Link>
  );
};