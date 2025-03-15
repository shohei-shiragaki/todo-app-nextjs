import { Todo } from "@/types";
import { Box, Container, Link, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Loading from "../Loading";
import 'dayjs/locale/ja';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja'); 

type DetailPageProps = {
    todo: Todo;
  };
  
const DetailPage = ({ todo }: DetailPageProps) => {

    if (!todo) {
        return <Loading/>;
    }

  return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                  TODO詳細ページ
              </Typography>
              <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                  タイトル:
                  </Typography>
                  <Typography variant="body1" sx={{ pl: 3 }}>{todo.title}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                  詳細:
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', pl: 3 }}>{todo.detail}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                  締め切り日:
                  </Typography>
                  <Typography variant="body1" sx={{ pl: 3 }}>{dayjs(todo.deadline).format('YYYY/MM/DD HH:mm')}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom>

                  ステータス:
                  </Typography>
                  <Typography variant="body1" sx={{ pl: 3 }}>{todo.status ? "完了" : "未完了"}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                  <Link 
                      href="../" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                      sx={{color: 'white', textDecoration: 'none' }}
                  >
                      一覧画面へ
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
}

export default DetailPage;