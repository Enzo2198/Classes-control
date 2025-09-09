import {Box, Button, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import {Grid} from '@mui/material';
import {useCreateExam} from "./createExam.tsx";

export default function CreateQuestionPage() {
  const {form, handleInputChange, handleAnswerChange} = useCreateExam()

  return (
    <Box sx={{p: 3, height: "100%", display: "flex", flexDirection: "column"}}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Danh sách bài thi &gt; Thi thử &gt; Thêm đề bài
      </Typography>

      <Grid container spacing={2} sx={{height: "100%"}}>
        <Grid size={{xs: 12, sm: 6}}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="outlined">Tải lên từ máy</Button>
          </Paper>
        </Grid>

        <Grid size={{xs: 12, sm: 6}}>
          <Paper sx={{
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
            <TextField name="title" label="Tên đề *" size="small" value={form.title} onChange={handleInputChange}/>
            <TextField name="code" label="Mã đề *" size="small" value={form.code} onChange={handleInputChange}/>
            <TextField name="duration" label="Thời gian làm bài (phút) *" size="small" value={form.duration}
                       onChange={handleInputChange}/>
            <TextField name="questionCount" label="Số câu *" type="number" size="small" value={form.questionCount}
                       onChange={handleInputChange}/>

            <Box>
              <Typography fontWeight="bold">Câu 1:</Typography>
              <Box sx={{display: "flex", gap: 1, mt: 1, flexWrap: "wrap"}}>
                <Select
                  size="small"
                  value={form.answers[1]?.answerType || ""}
                  onChange={(e) => handleAnswerChange(1, "answerType", e.target.value)}
                  displayEmpty
                  sx={{minWidth: 150}}
                >
                  <MenuItem value="">Chọn 1 đáp án</MenuItem>
                  <MenuItem value="multi">Nhiều đáp án</MenuItem>
                  <MenuItem value="short">Tự luận</MenuItem>
                </Select>

                {["A", "B", "C", "D"].map((opt) => (
                  <Box key={opt} sx={{display: "flex", alignItems: "center"}}>
                    <input
                      type="radio"
                      checked={form.answers[1]?.correctAnswer === opt}
                      onChange={() => handleAnswerChange(1, "correctAnswer", opt)}
                    />
                    <Typography ml={0.5}>{opt}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Button variant="contained" fullWidth>
              Tạo đề bài
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>

  );
}
