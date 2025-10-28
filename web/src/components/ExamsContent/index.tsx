import {Box, Button, Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {Add as AddIcon, Search as SearchIcon, Description as DescriptionIcon} from '@mui/icons-material';
import DialogCreateExam from "../Common/dialogExam.tsx";
import {useExamsContent} from "./examsContent.tsx";
import type {Course, ExamGroup} from "../../utils";
import dayjs from "dayjs";
import {Link} from "react-router";
import {Loading} from "../index.tsx";

export default function TestsContent({course}: { course: Course }) {
  const {
    courseId, userRole, handleSearchChange, openExamGroups, onMounted, notOpenExamGroups, searchQuery,
    isDeleting, setIsDeleting, isOpenDialog, setIsOpenDialog, isLoading, handleCreateExamGroup
  } = useExamsContent({course})

  if (isLoading) return <Loading/>

  return (
    <Box sx={{p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh'}}>
      {/* Header with search and create button */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Danh sách Bài thi
        </Typography>

        <Box sx={{display: 'flex', gap: 2}}>
          <TextField
            placeholder="Tìm kiếm"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action"/>
                  </InputAdornment>
                )
              },

            }}
            sx={{backgroundColor: "#fff", flexShrink: 0, minWidth: '300px', mb: 2}}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon/>}
            onClick={handleCreateExamGroup}
            // not allowing students to create an exam group
            sx={{
              display: userRole === 'student' ? 'none' : {xs: 'block', sm: 'inline-flex'},
              flexShrink: 0, mb: 2
            }}
          >
            Tạo bài thi
          </Button>
        </Box>
      </Box>

      {/* Active Exams Section */}
      <Box sx={{mb: 4}}>
        <Typography
          variant="subtitle1"
          fontWeight="medium"
          color="primary"
          sx={{mb: 2}}
        >
          Bài thi đang diễn ra
        </Typography>

        <ExamGroupsGrid examGroups={openExamGroups} classId={course.id}/>
      </Box>

      {/* Not Active Tests Section - won't allow students to see */}
      <Box sx={{
        mb: 4,
        display: userRole === 'student' ? 'none' : 'block'
      }}>
        <Typography
          variant="subtitle1"
          fontWeight="medium"
          color="primary"
          sx={{mb: 2}}
        >
          Bài thi chưa bắt đầu
        </Typography>

        <ExamGroupsGrid examGroups={notOpenExamGroups} classId={course.id}/>
      </Box>

      {/* Dialog create exam */}
      <DialogCreateExam
        courseId={courseId}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        onMounted={onMounted}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </Box>
  );
}

function ExamGroupsGrid({examGroups, classId}: { examGroups: ExamGroup[], classId: number }) {

  return (
    <>
      <Grid container spacing={2}>
        {examGroups.length === 0 && (<>0</>)}
        {examGroups.map((examGroup: ExamGroup) => (
          <Grid size={{xs: 12, md: 6, lg: 4}} key={examGroup.id} sx={{border: '1px solid #0000ff'}}>

            <Paper elevation={0}>
              <Link to={`/class/${classId}/exam/${examGroup.id}`}
                    style={{textDecoration: 'none', color: "#000000"}}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: '20px',
                    p: 2,
                    mr: 2
                  }}
                >
                  <DescriptionIcon
                    sx={{
                      fontSize: 48,
                      color: '#3498db'
                    }}
                  />

                  <Box>
                    <Typography variant='body1' fontWeight="medium" textAlign="left"
                                sx={{mb: 1}}>
                      {examGroup.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"
                                fontWeight={'medium'}>
                      Ngày bắt đầu: {dayjs(examGroup.start_time).format('DD/MM/YYYY')}
                    </Typography>
                  </Box>

                </Box>
              </Link>
            </Paper>

          </Grid>
        ))}
      </Grid>
    </>
  )
}
