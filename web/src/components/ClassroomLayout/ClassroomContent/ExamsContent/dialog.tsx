import {type ChangeEvent, useEffect, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, TextField, Typography} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {postMethod} from "../../../../utils";
import {useParams} from "react-router-dom";
import {useExams} from "../../examsProvider.tsx";
import {RequiredMark} from "../../../index.tsx";

interface ExamFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; start_time: string; wait_time: number }) => void;
  initialData?: { name: string; start_time: string; wait_time: number };
  mode?: "create" | "edit";
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export default function DialogCreateExam({open, onClose, onSubmit, initialData, mode = "create"}: ExamFormDialogProps) {
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const { id } = useParams<{ id: string }>();
  const { refetchExams } = useExams();

  const [form, setForm] = useState({
    name: "",
    start_time: "",
    wait_time: 0,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        wait_time: initialData.wait_time ?? (initialData as any).await_time ?? 0,
        start_time: initialData.start_time || "",
      });
      setStartTime(initialData.start_time ? dayjs(initialData.start_time) : null);
    } else {
      setForm({ name: "", wait_time: 0, start_time: "" });
      setStartTime(null);
    }
  }, [initialData, open]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "wait_time" ? parseInt(value) || 0 : value,
    }));
  };


  const handleSubmit = async () => {
    if (!form.name || !startTime || !form.wait_time) return;

    if (mode === "create") {
      try {
        const response = await postMethod('exam_group', {
          name: form.name,
          class_id: `${id}`,
          await_time: form.wait_time,
          start_time: startTime.format("YYYY-MM-DD"),
        });
        if (!response) throw new Error('Connect server failed');
        await refetchExams();
      } catch (e) {
        console.error(e);
      }
      onClose();
    } else {
      onSubmit({
        name: form.name,
        start_time: startTime.format("YYYY-MM-DD"),
        wait_time: form.wait_time,
      });
      onClose();
    }
  };


  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2, width: '450px' }} id="customized-dialog-title">
        {mode === "edit" ? "Chỉnh sửa bài thi" : "Tạo bài thi mới"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{
            fontWeight: 'bold',
            mb: 1,
            color: 'text.primary'
          }}>
            Tên bài thi
            <RequiredMark/>
          </Typography>
          <TextField
            size="small"
            fullWidth
            placeholder="Nhập tên bài thi"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            sx={{ backgroundColor: 'white' }}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{
            fontWeight: 'bold',
            mb: 1,
            color: 'text.primary'
          }}>
            Thời gian giữa các bài thi(phút)
            <RequiredMark/>
          </Typography>
          <TextField
            size="small"
            fullWidth
            placeholder="Nhập thời gian"
            type="number"
            name="wait_time"
            value={form.wait_time.toString()}
            onChange={handleChange}
            required
            sx={{ backgroundColor: 'white' }}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{
            fontWeight: 'bold',
            mb: 1,
            color: 'text.primary'
          }}>
            Thời gian bắt đầu
            <RequiredMark/>
          </Typography>
          <DatePicker
            label="mm/dd/yyyy"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
            format="MM/DD/YYYY"
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small"
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === "edit" ? "Lưu thay đổi" : "Tạo mới"}
        </Button>
        <Button onClick={onClose}>Hủy</Button>
      </DialogActions>
    </BootstrapDialog>
  )
}