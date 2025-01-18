import { Todo } from "@/types";
import { Box, Container, Link, Paper, Typography } from "@mui/material";
import React from "react";

const page = async({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const response = await fetch(`https://todo-api-aa9t.onrender.com/todos/${id}`, { cache: 'no-store' });
    const todo: Todo = await response.json();

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    TODO詳細ページ
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" component="h2">
                    タイトル:
                    </Typography>
                    <Typography variant="body1">{todo.title}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" component="h2">
                    詳細:
                    </Typography>
                    <Typography variant="body1">{todo.detail}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" component="h2">
                    締め切り日:
                    </Typography>
                    <Typography variant="body1">{todo.deadline}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" component="h2">
                    ステータス:
                    </Typography>
                    <Typography variant="body1">{todo.status ? "完了" : "未完了"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    <Link 
                        href="../" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                        sx={{color: 'white', textDecoration: 'none' }}
                    >
                        戻る
                    </Link>
                    <Link 
                        href={`../todo-edit/${todo.id}`} 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        sx={{color: 'white', textDecoration: 'none' }}
                    >
                        編集
                    </Link>
                </Box>
            </Paper>
        </Container>
    )
};

export default page;
