import {type FormEvent, useEffect, useState} from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Grid,
  IconButton,
  styled,
  TextField,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {
  deleteMethod,
  type ExamGroupDialogProps,
  type ExamGroupForm,
  getValidAccessToken,
  postMethod,
  putMethod
} from "../../utils";
import {RequiredMark} from "../index.tsx";
import {useNavigate} from "react-router";
import type {PickerValue} from "@mui/x-date-pickers/internals";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import * as React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export default function DialogCreateExam(
  {courseId, isOpenDialog, setIsOpenDialog, isDeleting, setIsDeleting, examGroup, onMounted}: ExamGroupDialogProps) {
  const isEditMode: boolean = examGroup !== undefined
  const navigate = useNavigate()

  const handleCloseDialog = () => {
    setIsOpenDialog(false)
  }

  /*************** form & validation *****************/
  const [formData, setFormData] = useState<ExamGroupForm>({
    name: '',
    awaitTime: '',
    startTime: ''
  });

  useEffect(() => {
    setFormData({
      name: examGroup?.name ?? '',
      awaitTime: examGroup ? String(examGroup.await_time / 60) : '',
      startTime: examGroup?.start_time ?? ''
    })
  }, [examGroup]);

  const [helperTexts, setHelperTexts] = useState({
    name: '',
    awaitTime: '',
    startTime: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    awaitTime: false,
    startTime: false
  })

  const validate = (name: keyof ExamGroupForm, value: string) => {
    let error = ""
    switch (name) {
      case 'name':
        if (!value) error = 'Vui lòng nhập tên bài thi'
        break;

      case 'awaitTime':
        if (!value) error = 'Vui lòng nhập thời gian'
        else if (isNaN(Number(value)) || Number(value) <= 0) error = 'vui lòng nhập thời gian lớn hơn 0'
        break;

      case 'startTime':
        if (!value) error = 'Vui lòng nhập thời gian bắt đầu'
        break;
    }

    setHelperTexts(prev => ({...prev, [name]: error}))
    return !error
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}))

    if (touched[name as keyof ExamGroupForm]) validate(name as keyof ExamGroupForm, value)
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTouched(prev => ({...prev, [name]: true}))
    validate(name as keyof ExamGroupForm, value)
  }

  const onChangeStartTime = (newValue: PickerValue) => {
    setFormData({
      ...formData,
      startTime: newValue?.format('YYYY-MM-DD') ?? ''
    })

    validate('startTime', newValue?.format('YYYY-MM-DD') ?? '');
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // set all touched to true
    const curTouched = {...touched};
    Object.keys(touched).forEach((key: string) => {
      curTouched[key as keyof ExamGroupForm] = true;
    })
    setTouched(curTouched);

    // check valid
    const isValid: boolean =
      validate('name', formData.name) &&
      validate('awaitTime', formData.awaitTime) &&
      validate('startTime', formData.startTime);

    if (!isValid) return;

    // submit logic
    const payload = {
      name: formData.name,
      class_id: courseId,
      start_time: formData.startTime,
      await_time: Number(formData.awaitTime) * 60,
      is_once: true,
      is_save_local: true
    }
    const accessToken: string | null = await getValidAccessToken();
    let response;
    if (!isEditMode) {
      response = await postMethod('/exam_groups', payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    } else {
      response = await putMethod(`/exam_groups/${examGroup?.id}`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    if (!response) {
      toast.error('Tạo bài thi thất bại, hãy thử lại!');
    } else {
      toast.success('Tạo bài thi thành công!');
      handleCloseDialog();
      setFormData({name: '', awaitTime: '', startTime: ''});
      onMounted();    // update the UI
    }
  }

  const onDelete = async () => {
    const accessToken: string | null = await getValidAccessToken();
    const response = await deleteMethod(`/exam_groups/${examGroup?.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    setIsDeleting(false);
    handleCloseDialog();
    if (!response) {
      toast.error('Có lỗi khi xóa! Hãy thử lại!');
    } else {
      toast.success('Xóa thành công! ');
      navigate(`/class/${courseId}/exam`);
    }
  }

  return (
    <BootstrapDialog
      onClose={handleCloseDialog}
      aria-labelledby="customized-dialog-title"
      open={isOpenDialog}
    >
      <DialogTitle sx={{m: 0, p: 2, width: '450px'}} id="customized-dialog-title">
        {isDeleting ? "Xóa bài thi" : isEditMode ? "Chỉnh sửa bài thi" : "Tạo bài thi mới"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon/>
      </IconButton>
      <Box component={'form'} sx={{width: '100%'}}
           onSubmit={onSubmit}
           display={!isDeleting ? 'block' : 'none'}
      >
        <DialogContent dividers>
          <Box sx={{mb: 4}}>
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
              value={formData.name}
              onChange={onChange}
              onBlur={onBlur}
              error={touched.name && Boolean(helperTexts.name)}
              helperText={touched.name && helperTexts.name}
              required
              sx={{backgroundColor: 'white'}}
            />
          </Box>
          <Box sx={{mb: 4}}>
            <Typography
              variant="subtitle1"
              sx={{
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
              name={"awaitTime"}
              value={formData.awaitTime}
              onChange={onChange}
              onBlur={onBlur}
              error={touched.awaitTime && Boolean(helperTexts.awaitTime)}
              helperText={touched.awaitTime && helperTexts.awaitTime}
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
              Thời gian bắt đầu
              <RequiredMark/>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name={"startTime"}
                value={formData.startTime ? dayjs(formData.startTime, 'YYYY-MM-DD') : null}
                onChange={onChangeStartTime}
                // CSS to look like TextField
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    error: touched.startTime && Boolean(helperTexts.startTime),
                    helperText: touched.startTime && helperTexts.startTime,
                    sx: {my: 1}
                  }
                }}
              />
            </LocalizationProvider>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant={'outlined'} onClick={handleCloseDialog}>
            Hủy
          </Button>
          <Button fullWidth variant={'contained'} type={'submit'}>
            {isEditMode ? "Lưu thay đổi" : "Tạo mới"}
          </Button>
        </DialogActions>
      </Box>

      {/*  Exam group deletion form  */}
      <Box sx={{width: '100%'}}
           display={isDeleting ? 'block' : 'none'}
      >
        <Typography sx={{margin: 2}}>Bạn có chắc chắn muốn xóa bài thi này không?</Typography>
        {/* Buttons */}
        <Grid container sx={{margin: 2}} spacing={2}>
          <Grid size={{xs: 6}}>
            <Button
              fullWidth variant={'contained'}
              color={'error'}
              onClick={onDelete}
            >
              Xóa
            </Button>
          </Grid>

          <Grid size={{xs: 6}}>
            <Button
              fullWidth variant={'outlined'}
              color={'primary'}
              onClick={() => {
                setIsDeleting(false);
                handleCloseDialog();
              }
              }
            >
              Hủy
            </Button>
          </Grid>
        </Grid>
      </Box>
    </BootstrapDialog>
  )
}