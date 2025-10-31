  import {Box, Typography, Grid} from '@mui/material';
  import {useNavigate, useParams, Link} from 'react-router-dom';
  import {useEffect} from 'react';
  import {useExamFlow} from '../../../contexts/ExamFlowProvider';
  import {Loading} from '../../Common';
  import type {ExamWithStatus} from '../../../utils';
  import AccessTimeIcon from "@mui/icons-material/AccessTime";
  import {formatTime} from "./Page/examDetail.tsx";

  export default function StudentExamGroup() {
    const navigate = useNavigate();
    const {id, examGroupId} = useParams();

    // load from context
    const {
      isLoading,
      examGroupDetail,
      examsWithStatus,
      awaitingTime,
      isUnlocking,
      initializeExamData,
    } = useExamFlow();

    const handleBackToExamGroupsList = () => {
      navigate(`/class/${id}/exam`);
    };

    // mounting
    useEffect(() => {
      if (examGroupId) {
        initializeExamData(examGroupId);
      }
    }, [initializeExamData, examGroupId]);

    const numberOfCompletedExams: number = examsWithStatus.filter(exam => exam.status === 'completed').length;
    let awaitTimeInMinutes: number = examGroupDetail ? examGroupDetail.await_time / 60 : 0;

    const isAllCompleted =
      examsWithStatus.length > 0 &&
      examsWithStatus.every(exam => exam.status === 'completed');


    if (isLoading) return <Loading/>;

    return (
      <>
        <Box sx={{display: 'flex', mb: 1}}>
          <Typography variant="h6" fontWeight="600" onClick={handleBackToExamGroupsList}
                      sx={{cursor: 'pointer', '&:hover': {textDecoration: 'underline'}, mr: 2}}>
            Danh sách bài thi
          </Typography>
          <Typography variant="h6" fontWeight="bold" sx={{mr: 2}}>&gt;</Typography>
          <Typography variant="h6" fontWeight="bold" mb={2}>Chi tiết bài thi</Typography>
        </Box>

        <Box sx={{mb: 3, p: 2, backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #0000ff'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box>
              <Typography variant={"body1"} fontWeight={600} color={'info'}>Tên bài
                thi: {examGroupDetail?.name}</Typography>
              <Typography variant={"body1"} fontWeight={600} color={'error'}>Thời gian chờ giữa các đề
                bài: {awaitTimeInMinutes} phút</Typography>
              <Typography variant={"body1"} fontWeight={600} color={'success'}>Trạng thái hoàn
                thành: {numberOfCompletedExams}/{examsWithStatus.length}</Typography>
            </Box>

            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              {
                isUnlocking ? (
                  <>
                    <Typography variant="h6" color="success.dark">
                      Làm bài tiếp theo sau:
                    </Typography>
                    <Typography variant={'h5'} sx={{fontWeight: 600, color: '#333333'}}>
                      {formatTime(awaitingTime)}
                    </Typography>
                    <AccessTimeIcon/>
                  </>
                ): isAllCompleted ? (
                  <Typography variant="h6" color="success.main">
                    Chúc mừng bạn đã hoành thành hết bài thi!
                  </Typography>
                ) : (
                  <Typography variant="h6" color="success.dark">
                    Phần thi tiếp theo đã sẵn sàng
                  </Typography>
                )}
            </Box>
          </Box>

        </Box>


        <Box><Typography variant={"h6"} fontWeight={600} color={'primary'}>Danh sách đề bài</Typography></Box>

        {(!examsWithStatus || examsWithStatus.length === 0)
          ? <Typography fontWeight={500}>Chưa có đề bài nào được tải lên</Typography>
          : <ExamsGrid
            exams={examsWithStatus}
            classId={id!}
            examGroupId={examGroupId!}
            awaitingTime={awaitingTime}
          />
        }
      </>
    );
  }

  function ExamsGrid(
    {exams, classId, examGroupId, awaitingTime}:
    { exams: ExamWithStatus[], classId: string, examGroupId: string, awaitingTime: number }) {

    return (
      <Grid container spacing={2} sx={{my: 3}}>
        {exams.map((exam: ExamWithStatus) => (
          <Grid key={exam.id} size={{xs: 12, lg: 6}}>

            {exam.status === 'unlocked' ? (
              <Link to={`/class/${classId}/exam/${examGroupId}/doing?lesson=${exam.id}`}
                    style={{textDecoration: 'none', color: "#000000"}}>
                <ExamBox exam={exam} awaitingTime={awaitingTime}/>
              </Link>
            ) : (
              <Box sx={{backgroundColor: '#e0ecf6', cursor: 'not-allowed'}}>
                <ExamBox exam={exam} awaitingTime={awaitingTime}/>
              </Box>
            )}

          </Grid>
        ))}
      </Grid>
    );
  }

  function ExamBox({exam, awaitingTime}: { exam: ExamWithStatus, awaitingTime: number }) {
    return (
      <Box sx={{border: '1px dotted #0000ff', borderRadius: '8px', p: 1}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '16px'}}>
          <Typography sx={{
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 'calc(100% - 150px)'
          }}>
            Đề bài: {exam.name}
          </Typography>
          <ExamStatusLabel exam={exam} awaitingTime={awaitingTime}/>
        </Box>
        <Typography>Mã đề: {exam.code}</Typography>
        <Typography>Thời gian làm bài: {exam.total_time / 60} phút</Typography>
      </Box>
    );
  }

  function ExamStatusLabel({exam, awaitingTime}: { exam: ExamWithStatus, awaitingTime: number }) {
    switch (exam.status) {
      case 'completed':
        return <Typography color={'primary'} sx={{fontWeight: 600}}>Đã hoàn thành</Typography>;
      case 'locked':
        return <Typography color={'error'} sx={{fontWeight: 600}}>Chưa mở</Typography>;
      case 'unlocking':
        return <Typography color={'warning'} sx={{fontWeight: 600}}>Mở sau: {formatTime(awaitingTime)}s</Typography>;
      case 'unlocked':
        return <Typography color={'success.dark'} sx={{fontWeight: 600}}>Đang mở</Typography>;
      default:
        return <></>;
    }
  }