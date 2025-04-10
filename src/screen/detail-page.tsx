import { Todo } from "@/types";
import { Box, Container, Link, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Loading from "@/component/loading";
import 'dayjs/locale/ja';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

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
                  <Typography variant="body1" sx={{ pl: 3 }}>{dayjs(todo.deadline).tz("Asia/Tokyo").format('YYYY/MM/DD HH:mm')}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    ステータス:
                  </Typography>
                  <Typography variant="body1" sx={{ pl: 3 }}>{todo.status ? "完了" : "未完了"}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                  <Link 
                      href="/" 
                      sx={{
                        backgroundColor: "gray",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        "&:hover": {
                          backgroundColor: "darkgray",
                        },
                        "&:focus": {
                          outline: "none",
                          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)", // focus:ring-blue-300
                        },
                      }}
                    
                  >
                      一覧画面へ
                  </Link>
                  <Link 
                      href={`/todo-edit/${todo.id}`} 
                      sx={{
                        backgroundColor: "blue",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        "&:hover": {
                          backgroundColor: "darkblue",
                        },
                        "&:focus": {
                          outline: "none",
                          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)", // focus:ring-blue-300
                        },
                      }}
                  >
                      編集
                  </Link>
              </Box>
          </Paper>
      </Container>
    )
}

export default DetailPage;