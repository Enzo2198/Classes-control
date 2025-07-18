import {useState } from "react";
import type { Test } from "../../../../utils";
import {Box, Button, Grid, InputAdornment, Paper, styled, TextField, Typography} from "@mui/material";
import {Add as AddIcon, Description as DescriptionIcon, Search as SearchIcon} from '@mui/icons-material';
import dayjs from "dayjs";
import DialogCreateExam from "./dialog.tsx";
import {useExams} from "../../examsProvider.tsx";
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";

export default function TestsContent() {
  const { exams } = useExams();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter time exams
  const now = dayjs();
  const activeExams = exams.filter((exam) => dayjs(exam.start_time).isBefore(now, 'day'));
  const pendingExams = exams.filter((exam) => dayjs(exam.start_time).isAfter(now, 'day'));


  // Handle search input change
  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  const renderExamList = (examList: Test[]) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    if (examList.length === 0) {
      return <Typography color="text.secondary">0</Typography>;
    }

    return (
      <Grid container spacing={2} alignItems="stretch">
        {examList.map((test: Test) => (
          <Grid size={{xs: 12, md: 6, lg: 4}} key={test.id} sx={{borderLeft: '5px solid #0A78D1', display: 'flex'}}>
            <Item
              sx={{ flex: 1, cursor: 'pointer' }}
              onClick = {() => navigate(`/class/${id}/exam/${test.id}`)}
            >
              <Paper elevation={0} sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                <Box
                  sx={{display: 'flex', alignItems: 'flex-start', gap: '20px', p: 2, mr: 2}}
                >
                  <DescriptionIcon sx={{fontSize: 48, color: '#3498db'}}/>

                  <Box>
                    <Typography variant="body1" fontWeight="medium" textAlign="left" sx={{ mb: 1 }}>
                      {test.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="left" fontWeight="medium">
                      Ngày bắt đầu:{" "}
                      {test.start_time ? test.start_time.split(" ")[0] : "Chưa xác định"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Item>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Handle create test button click
  const [open, setOpen] = useState(false);

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action"/>
                </InputAdornment>
              ),
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#90caf9',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#42a5f5',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#42a5f5',
                },
              },
            }}
            sx={{width: 300, backgroundColor: "#fff"}}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon/>}
            onClick={() => setOpen(true)}
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
          Bài thi đang diễn ra ({activeExams.length})
        </Typography>

        {renderExamList(activeExams)}
      </Box>

      {/* Pending Exams Section */}
      <Box sx={{mb: 4}}>
        <Typography
          variant="subtitle1"
          fontWeight="medium"
          color="primary"
          sx={{mb: 2}}
        >
          Bài thi chưa bắt đầu ({pendingExams.length})
        </Typography>

        {renderExamList(pendingExams)}
      </Box>

      {/* Dialog create exam */}
      <DialogCreateExam open={open} onClose={() => setOpen(false)} onSubmit={() => {}} />
    </Box>
  );
}
