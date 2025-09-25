import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import {Add as AddIcon, Search as SearchIcon} from '@mui/icons-material';
import DialogCreateExam from "./dialog.tsx";
import {useExamsContent} from "./examsContent.tsx";

export default function TestsContent() {
  const { searchQuery, activeExams, pendingExams, handleSearchChange, renderExamList, open, setOpen } = useExamsContent()

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
