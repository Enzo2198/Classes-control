import {Box, Button, Grid, Typography} from "@mui/material";
import type {ExamResult, ResultGroupsListProps, StudentResultGroup} from "../../utils";
import { AvatarDefault } from "../Common";

export default function ResultGroupsList(
  {studentResultGroups, numberOfExams, handleMark}: ResultGroupsListProps) {

  const countCompleted = (studentResultGroups: StudentResultGroup) => {
    return studentResultGroups.result.length
  }

  // Remark the exam when it has a write answer
  const isWaitingForRemark = (studentResultGroups: StudentResultGroup) => {
    for (let i = 0; i < studentResultGroups.result.length; i++) {
      const examResult: ExamResult = studentResultGroups.result[i]
      for(let j = 0; j <examResult.answers.length; j++) {
        // Answered but not marked
        if (examResult.answers[j].is_correct === null && examResult.answers[j].answer !== null) {
          return true
        }
      }
    }
    return false
  }

  return (
    <Grid container spacing={2} sx={{my: 3}}>
      {
        studentResultGroups.map(studentResult => (
          <Grid key={studentResult.id} size={{xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Box sx={{border: '1px solid #0000ff', borderRadius: '8px', p: 2, backgroundColor: '#ffffff'}}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                mb: '10px'
              }}>
                <AvatarDefault fullName={studentResult.name} />
                <Box>
                  <Typography variant={'body1'} sx={{fontWeight: 600}}>
                    {studentResult.name}
                  </Typography>
                  <Typography variant={'body2'}>
                    {studentResult.email}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant={'body1'} color={'primary'}>
                  Số đề đã hoàn thành: {countCompleted(studentResult)}/{numberOfExams}
                </Typography>

                <Typography variant={'body1'}>
                  Trạng thái:
                  {
                    isWaitingForRemark(studentResult) ?
                      <span style={{color: '#ff0000', marginLeft: 10}}>Chờ chấm lại</span> :
                      <span style={{color: '#008000', marginLeft: 10}}>Đã chấm xong</span>
                  }
                </Typography>
              </Box>

              <Box sx={{textAlign: 'center', mt: '20px'}}>
                <Button variant={'contained'} color={'success'} size={'large'}
                        onClick={()=>handleMark(studentResult.id)}
                >
                  Chi tiết
                </Button>
              </Box>
            </Box>
          </Grid>
        ))
      }
    </Grid>
  )
}