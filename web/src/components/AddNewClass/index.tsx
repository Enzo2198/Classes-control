import {GHeader, RequiredMark} from "../index.tsx";
import {Box, Container, Typography, TextField, Button, Paper, Divider} from "@mui/material";
import {useAddNewClass} from "./addNewClass.tsx";
import {useNavigate} from "react-router";

export default () => {
  const { className, setClassName, classCode, setClassCode, toCreateClass } = useAddNewClass()
  const navigate = useNavigate();

  return (
    <>
      <GHeader/>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: '#f0f2f5',
          minHeight: 'calc(100vh - 64px)',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3
        }}
      >
        <Paper elevation={3} sx={{p: 4, maxWidth: 600, width: "100%"}}>
          <Typography variant="h5" component="h1" gutterBottom sx={{
            fontWeight: 'bold',
            mb: 3,
            fontSize: '1.5rem'
          }}>
            Thêm lớp học mới
          </Typography>

          <Box sx={{mb: 4}}>
            <Typography variant="subtitle1" sx={{
              fontWeight: 'bold',
              mb: 1,
              color: 'text.primary'
            }}>
              Tên lớp học
              <RequiredMark/>
            </Typography>
            <TextField
              fullWidth
              placeholder="Nhập tên lớp học"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              sx={{backgroundColor: 'white'}}
            />
          </Box>

          <Box sx={{mb: 4}}>
            <Typography variant="subtitle1" sx={{
              fontWeight: 'bold',
              mb: 1,
              color: 'text.primary'
            }}>
              Mã bảo vệ
              <RequiredMark/>
            </Typography>
            <TextField
              fullWidth
              placeholder="Nhập mã bảo vệ"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              required
              sx={{backgroundColor: 'white'}}
            />
          </Box>

          <Divider sx={{my: 3}}/>

          <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2}}>
            <Button
              variant="outlined"
              onClick={() => navigate('/classes')}
              sx={{
                px: 3,
                py: 1,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={toCreateClass}
              disabled={!className || !classCode}
              sx={{
                px: 3,
                py: 1,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Tạo mới
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};