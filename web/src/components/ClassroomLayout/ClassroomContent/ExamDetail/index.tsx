import { Box, Button, Paper, Typography } from "@mui/material";
import DialogCreateExam from "../ExamsContent/dialog.tsx"
import { useNavigate } from "react-router";
import { useExamDetail } from "./examDetail.tsx";

export default function ExamDetail() {
  const { exam, openEdit, id, examId, setOpenEdit, handleUpdateExam, deleteExam } = useExamDetail()
  const navigate = useNavigate();

  if (!exam) return <Typography>Đang tải...</Typography>;


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Danh sách bài thi &gt; Chi tiết bài thi
      </Typography>

      <Paper sx={{ p: 3, mb: 3, border: "1px solid #0A78D1", borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography variant="body1" fontWeight="bold">
            Tên bài thi: {exam.name}
          </Typography>
          <Typography variant="body1">
            Ngày bắt đầu: {exam.start_time?.split(" ")[0]}
          </Typography>
          <Typography variant="body1">
            Thời gian chờ giữa các đề bài: {exam.await_time ? exam.await_time : 0} phút
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenEdit(true)}
          >
            Chỉnh sửa
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteExam()}
          >
            Xóa bỏ
          </Button>
        </Box>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>
            Danh sách đề bài
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/class/${id}/exam/${examId}/0`)}
            >
              + Thêm đề bài
            </Button>
          </Box>
        </Box>
        <Typography color="text.secondary">Chưa có đề bài nào được tải lên.</Typography>
      </Box>

      <Box>
        <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>
          Danh sách bài làm
        </Typography>
        <Typography color="text.secondary">Chưa có học viên nào làm bài thi.</Typography>
      </Box>

      <DialogCreateExam
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSubmit={handleUpdateExam}
        initialData={exam}
        mode="edit"
      />

    </Box>

  );
}
