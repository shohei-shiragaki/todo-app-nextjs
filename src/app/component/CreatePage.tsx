"use client";

import { Box, Button, Container, InputLabel, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useRouter } from 'next/navigation';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTodo } from "@/todoAPI";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ja';

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

// ページの定義を丸ごとコンポーネントディレクトリに切り出しているのは微妙な気がします。ページの構成要素をコンポーネントと呼ぶので、ページ丸ごとであれば、componentディレクトリと同じ階層にscreenディレクトリなど作ってそこに置くか、page.tsxに書く方が良いです。
// この辺りのディレクトリの作り方や役割の把握が、実際の現場ではかなり重要なので、ぜひ覚えておくと良いと思います。
// また、よくある他のアプリだと、一覧と登録でページをわけずに、一覧画面上に登録や編集ダイアログを表示するパターンもありますね。私はダイアログの方が挙動が早くて好きですが、このあたりはデザイナーが決める話なので今回修正しなくてokです。次回以降で少しずつUIをより良くしていければ良いと思います。
const CreatePage = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors, isDirty } } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      detail: '',
      deadline: dayjs()
    }
  });

  const onSubmit = async (data: FormInputs) => {

    const req = {
      title: data.title,
      detail: data.detail,
      deadline: dayjs(data.deadline).toISOString(),
      status: false,
      create_date: dayjs().toISOString(),
    };
    try {
      const response = await createTodo(req);
      if (response.ok) {
        // 遷移先を「../」にするのはあまりみないです。
        // どの画面に遷移するかがわかりづらいので遷移先ページのパスを明示的に指定しましょう
        router.push('../');
      } else {
        console.error('作成に失敗しました');
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
    </Container>
  );
};

export default CreatePage;