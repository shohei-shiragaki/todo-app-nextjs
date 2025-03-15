"use client";

import { Todo } from "@/types";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, InputLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ja';
import { updateTodo } from "@/todoAPI";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

const schema = yup.object({
  title: yup
    .string()
    .required('タイトルは必須です')
    .max(50, 'タイトルは50文字以内で入力してください'),
  detail: yup
    .string()
    .transform((value) => value === '' ? null : value)
    .max(200, '詳細は200文字以内で入力してください')
    .nullable()
    .default(null),
  deadline: yup
    .mixed<Dayjs>()
    .required('締切日は必須です'),
  status: yup
    .boolean()
    .required('ステータスは必須です'),
}).required();

type FormInputs = {
  title: string;
  detail: string | null;
  deadline: dayjs.Dayjs;
  status: boolean;
};

type EditPageProps = {
  todo: Todo;
};

const EditPage = ({ todo }: EditPageProps) => {
  const router = useRouter();
  const [todoData,setTodoData] = useState<Todo>(todo);
  const { control, handleSubmit, formState: { errors, isDirty } } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: todoData.title,
      detail: todoData.detail || null,
      deadline: dayjs(todoData.deadline),
      status: todoData.status
    }
  });

  // フォームの値を取得
  const onSubmit = async (data: FormInputs) => {
    const req = {
      id: todo.id,
      title: data.title,
      detail: data.detail,
      deadline: dayjs(data.deadline).toISOString(),
      status: data.status,
      create_date: todo.create_date
    };

    try {
      const response = await updateTodo(req.id, req);
      if (response.ok) {
        router.push(`../todo-detail/${req.id}`);
      } else {
        console.error('更新に失敗しました');
      }
    } catch (error) {
      console.error('リクエスト中にエラーが発生しました:', error);
    }
  };

  useEffect(() => {
    setTodoData(todo);
  }, [todo]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TODO編集ページ
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Box sx={{ mb: 2 }}>
            <InputLabel>タイトル</InputLabel>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel>詳細</InputLabel>
            <Controller
              name="detail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  fullWidth
                  multiline
                  rows={7}
                  error={!!errors.detail}
                  helperText={errors.detail?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
              <InputLabel>締め切り日</InputLabel>
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    format="YYYY/MM/DD HH:mm"
                    ampm={false}
                    slotProps={{
                      textField: {
                        error: !!errors.deadline,
                        helperText: errors.deadline?.message,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ mb: 2 }}>
            <FormControl component="fieldset">
              <FormLabel 
                component="legend" 
                sx={{ 
                  color: 'rgba(0, 0, 0, 0.6)',
                  '&.Mui-focused': { color: 'rgba(0, 0, 0, 0.6)' },
                }}
              >
                ステータス
              </FormLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="完了"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="未完了"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('../')}
            >
              一覧画面へ戻る
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!isDirty}
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
