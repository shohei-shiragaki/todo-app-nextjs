"use client";

import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const CreatePage = () => {
  const router = useRouter();
  const [todoState, setTodoState] = useState({
    title: '',
    detail: '',
    deadline: '',
    status: false,
    create_date: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoState(prevTodo => ({
      ...prevTodo,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const req = {
      title: todoState.title,
      detail: todoState.detail,
      deadline: todoState.deadline,
      status: todoState.status,
      create_date: todoState.create_date
    };

    try {
      const response = await fetch('https://todo-api-aa9t.onrender.com/todo-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });

      if (response.ok) {
        console.log('作成に成功しました');
        router.push('../');
      } else {
        const errorData = await response.json();
        console.error('作成に失敗しました:', errorData);
      }
    } catch (error) {
      console.error('リクエスト中にエラーが発生しました:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TODO作成ページ
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Box sx={{ mb: 2 }}>
            <TextField
              label="タイトル"
              name="title"
              value={todoState.title}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="詳細"
              name="detail"
              value={todoState.detail}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="締め切り日"
              name="deadline"
              value={todoState.deadline}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('../')}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSave}
            >
              保存
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePage;