"use client";

import { Box, Button, Container, InputLabel, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTodo } from "@/todo-api";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ja';
import ErrorDialog from "@/component/error-dialog";

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
    .required('締切日は必須です')
    .test('future', '締切日は現在時刻より後に設定してください',
      value => dayjs(value).isAfter(dayjs()))
}).required();

type FormInputs = {
  title: string;
  detail: string | null;
  deadline: dayjs.Dayjs;
};

const CreateScreen = () => {
  const router = useRouter();
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { control, handleSubmit, formState: { errors, isDirty } } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      detail: '',
      deadline: dayjs()
    }
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      const req = {
        title: data.title,
        detail: data.detail,
        deadline: dayjs(data.deadline).toISOString(),
        status: false,
        create_date: dayjs().toISOString(),
      };

      const response = await createTodo(req);
      if (!response.ok) {
        console.error('Todoの作成に失敗しました。');
        setErrorMessage("Todoの作成に失敗しました。もう一度お試しください。");
        setErrorDialogOpen(true); 
      }
      router.push('/');
    } catch (error) {
      console.error('想定外のエラーが発生しました:', error);
      setErrorMessage("エラーが発生しました。もう一度お試しください。");
      setErrorDialogOpen(true); 
    }

  };
  const handleCloseDialog = () => {
    setErrorDialogOpen(false); 
    router.push('/');
  };
  
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TODO作成ページ
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    views={['year', 'month', 'day', 'hours', 'minutes']}
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('../')}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!isDirty}
            >
              作成
            </Button>
          </Box>
        </Box>
      </Paper>
      <ErrorDialog
        open={errorDialogOpen}
        message={errorMessage}
        onClose={handleCloseDialog}
      />
    </Container>
  );
};

export default CreateScreen;