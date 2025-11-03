import {Box, Button, Container, Typography, Grid} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {LogoElement} from "../../../Common";
import StudentAnswers from "../CustomHook/answers.tsx";
import StudentExamDialog from "./examDialog.tsx";
import useExamDetail from "../CustomHook/examDetail.ts";

export default function StudentExamDetail() {
  const {
    isOpenDialog, handleBackToExamGroupDetail, handleSubmitEarly,
    state, dispatch, setIsOpenDialog, onSubmit
  } = useExamDetail()

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        p: 2
      }}>
        <LogoElement width={40} height={30} fontSize={32} mb={0}/>
        <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          {
            state.timeLeft > 0
              ? (
                <>
                  <AccessTimeIcon/>
                  <Typography variant={'h5'} sx={{fontWeight: 600, color: '#333333'}}>
                    {formatTime(state.timeLeft)}
                  </Typography>
                </>)
              : (
                <Typography variant={'h5'} color={'error'} sx={{fontWeight: 600}}>
                  {'Hết giờ!'}
                </Typography>
              )
          }
        </Box>
        <Button variant={'contained'} onClick={handleSubmitEarly}>
          Nộp bài sớm
        </Button>
      </Box>

      <Container
        maxWidth={false}
        sx={{
          mt: '0px', backgroundColor: '#f0f2f5',
          height: 'calc(100vh - 80px)', p: 3,
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexShrink: 0
        }}>
          <Typography variant={'h6'} fontWeight={600} color={'#333333'}>
            Làm bài thi {'>'} {state.examName}
          </Typography>
          <Typography variant={'h6'} fontWeight={600} color={'#333333'}>
            Mã đề: {state.examCode}
          </Typography>
        </Box>

        <Box sx={{
          flexGrow: 1,
          minHeight: 0,
        }}>
          <Grid container spacing={2} sx={{height: "100%"}}>
            <Grid size={{xs: 12, lg: 6}} sx={{height: '100%'}}>
              <Box sx={{
                width: '100%',
                height: '100%',
                border: '1px dashed #cccccc',
                backgroundColor: "#ffffff",
              }}>
                <iframe
                  src={`${state.examFile.url}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block'
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{xs: 12, lg: 6}} sx={{
              height: '100%',
              border: 'none',
              overflowY: 'auto',
              backgroundColor: "#ffffff",
              p: 1
            }}>
              <StudentAnswers state={state} dispatch={dispatch}/>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <StudentExamDialog
        timeLeft={state.timeLeft}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        onSubmit={onSubmit}
        handleBackToExamGroupDetail={handleBackToExamGroupDetail}/>
    </>
  )
}

export function formatTime(seconds: number) {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const secondsLeft: number = seconds % 60;
  const hoursString: string = hours < 10 ? '0' + hours : hours.toString();
  const minutesString: string = minutes < 10 ? '0' + minutes : minutes.toString();
  const secondsString: string = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft.toString();
  return `${hoursString}:${minutesString}:${secondsString}`;
}