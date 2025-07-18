import { Box, Button, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {deleteMethod, getMethod, putMethod} from "../../../../utils";
import {useExams} from "../../examsProvider.tsx";
import DialogCreateExam from "../ExamsContent/dialog.tsx"
import {useNavigate} from "react-router";

interface putExamProps {
  name: string;
  start_time: string;
  wait_time: number
}

export default function ExamDetail() {
  const { examId, id } = useParams<{ examId: string; id: string }>();
  const [exam, setExam] = useState<any>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const { getExams } = useExams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        if (!examId) return;
        const response = await getMethod(`exam_group/${examId}`);
        setExam(response);
      } catch (err) {
        console.error("Lỗi khi load bài thi", err);
      }
    };
    fetchExam();
  }, [examId]);

  if (!exam) return <Typography>Đang tải...</Typography>;

  const handleUpdateExam = async (data: putExamProps) => {
    try {
      if (!examId) return;
      const response = await putMethod(`exam_group/${examId}`, {
        name: data.name,
        class_id: id,
        await_time: data.wait_time,
        start_time: data.start_time,
      })
      if (!response) throw new Error('Connect server failed')
      setExam(response);
      await getExams();
    } catch (e) {
      console.error(e);
    }
    setOpenEdit(false);
  }

  const deleteExam = async () => {
    try {
      if (!examId) return;
      await deleteMethod(`exam_group/${examId}`);
      // if (!response) throw new Error('Connect server failed')
      await getExams();
      navigate(`/class/${id}/exam`);
    } catch (e) {
      console.error(e);
    }
  }

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
