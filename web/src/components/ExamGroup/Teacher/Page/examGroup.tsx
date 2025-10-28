import {Box, Button, Paper, Typography} from "@mui/material";
import useTeacherExamGroup from "../CustomHook/examGroup.ts";
import {ExamGroupDialog} from "../../../Common";
import {ExamsList} from "../../../index.tsx";
import ResultGroupsList from "../../../ResultGroupsList";

export default function TeacherExamGroup() {
  const {
    handleBackToExamGroupsList,
    examName,
    startTime,
    awaitTime,
    handleEditExamGroup,
    handleDeleteExamGroup,
    handleCreateExam,
    exams,
    handleEditExam,
    studentResultGroups,
    handleMark,
    classId,
    isOpenDialog,
    setIsOpenDialog,
    isDeleting,
    setIsDeleting,
    examGroupDetail,
    onMounted
  } = useTeacherExamGroup()

  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Typography
          variant="h6" fontWeight="bold" mb={2}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
            mr: 2
          }}
          onClick={handleBackToExamGroupsList}
        >
          Danh sách bài thi
        </Typography>
        <Typography variant="h6" fontWeight="bold" mb={2}>&gt; Chi tiết bài thi</Typography>
      </Box>

      {/* Exam group info */}
      <Paper sx={{
        p: 3,
        mb: 3,
        border: "1px solid #0A78D1",
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }}>

        {/* Info */}
        <Box>
          <Typography variant={"body1"} fontWeight={500}>Tên bài thi: {examName}</Typography>
          <Typography variant={"body1"} fontWeight={500}>Ngày bắt đầu: {startTime}</Typography>
          <Typography variant={"body1"} fontWeight={500}>Thời gian chờ giữa các đề
            bài: {awaitTime} phút</Typography>
        </Box>
        {/* Buttons*/}
        <Box sx={{display: 'flex', gap: '10px', mt: 2}}>
          <Button variant={'contained'} color={'success'} onClick={handleEditExamGroup}>
            Chỉnh sửa
          </Button>
          <Button variant={'outlined'} color={'error'} onClick={handleDeleteExamGroup}>
            Xóa bỏ
          </Button>
        </Box>
      </Paper>

      {/* List of exams  */}
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant={"h6"} fontWeight={600} color={'primary'} mb={1}>Danh sách đề bài</Typography>
        <Button variant={'contained'} onClick={handleCreateExam}>
          + Thêm đề bài
        </Button>
      </Box>

      {
        (!exams || exams.length === 0)
          ? (
            <Typography mb={4}>
              Chưa có đề bài nào được tải lên.
            </Typography>
          )
          : <ExamsList exams={exams} handleEditExam={handleEditExam}/>
      }

      {/* List of student result groups */}
      <Typography variant={"h6"} fontWeight={600} color={'primary'} mb={1}>
        Danh sách bài làm
      </Typography>

      {
        (!studentResultGroups || studentResultGroups.length === 0)
          ? (
            <Typography>
              Chưa có học viên nào làm bài thi.
            </Typography>
          )
          : <ResultGroupsList studentResultGroups={studentResultGroups}
                              numberOfExams={exams.length}
                              handleMark={handleMark}
          />
      }

      <ExamGroupDialog
        courseId={classId}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        examGroup={examGroupDetail}
        onMounted={onMounted}
      />

    </>
  )
}