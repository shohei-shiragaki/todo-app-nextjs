"use client"
import { Button } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import Link from 'next/link';

// これは renderMyButton という通常の関数ではなく MyButton という名前のコンポーネントとして作成すべきです。（関数名の変更）
// また、utilsの配下に置く必要がないと思います。componentなのでcomponentフォルダに置くべきです。
export const renderMyButton = (params: GridRenderCellParams) => {
  return (
    <Link 
      href={`./todo-detail/${params.id}`}
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