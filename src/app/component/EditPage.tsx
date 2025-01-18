"use client";

import { Todo } from "@/types";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type EditPageProps = {
    todo: Todo;
  };
  
const EditPage = ({ todo }: EditPageProps) => {
    const [todoState, setTodoState] = useState<Todo>(todo);
    const router = useRouter();
    const defaultTodo: Todo = todo
    const buttonDisabled = JSON.stringify(todoState) === JSON.stringify(defaultTodo);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTodoState(prevTodo => ({
        ...prevTodo,
        [name]: value
      }));
    };

    const handleSave = async () => {
      const req = {
        id: todoState.id,
        title: todoState.title,
        detail: todoState.detail,
        deadline: todoState.deadline,
        status: todoState.status,
        create_date: todoState.create_date
      }

      try {
        const response = await fetch(`https://todo-api-aa9t.onrender.com/todos/${todoState.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req),
        });
        
        if (response.ok) {
          router.push(`../todo-detail/${todoState.id}`);          
        } else {
          console.error('Failed to update todo');
        }
      } catch (error) {
        console.error('リクエスト中にエラーが発生しました:', error);
      }
    };
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              TODO編集ページ
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
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="ステータス"
                  name="status"
                  value={todoState.status ? "完了" : "未完了"}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    router.push(`../`)
                  }}
                >
                  一覧画面へ
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSave}
                  disabled={buttonDisabled}
                >
                  保存
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      );
    };
    
    export default EditPage;