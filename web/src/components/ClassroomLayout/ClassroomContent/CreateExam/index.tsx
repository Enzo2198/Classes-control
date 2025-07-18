import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router";

export default function ExamDetail() {
  const { examId, id } = useParams<{ examId: string; id: string }>();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Danh sách bài thi &gt; Chi tiết bài thi
      </Typography>

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



    </Box>

  );
}
