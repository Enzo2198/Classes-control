import {Container, Box, Typography, CircularProgress, Button, TextField, InputAdornment} from "@mui/material";
import {GHeader, ClassGrid} from "../../components";
import {useClassListPage} from "./classes.tsx";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import type {ChangeEvent} from "react";


export default function classListPage() {
  const {loading, error, toAddCourseClick, displayAddClassButton, setSearch, filteredCourses} = useClassListPage()

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress/>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <GHeader/>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: '#f0f2f5',
          minHeight: 'calc(100vh - 64px)',
          p: 3
        }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{fontWeight: 'bold', color: '#333'}}>
            Danh sách lớp học
          </Typography>

          <Box sx={{display: 'flex', alignItems: 'center', gap: 2, my: 2}}>
            <TextField
              variant="outlined"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="Tìm kiếm"
              size="small"
              sx={{
                flexGrow: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: 'white',
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{color: 'action.active'}}/>
                    </InputAdornment>
                  )
                }
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon/>}
              onClick={toAddCourseClick}
              sx={{
                backgroundColor: '#f7c32e',
                color: '#333',
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: '8px',
                padding: '8px 16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: '#e0b028',
                },
                display: displayAddClassButton
              }}
            >
              Thêm lớp học
            </Button>
          </Box>
        </Box>

        <Box sx={{mt: 3}}>
          <ClassGrid courses={filteredCourses}/>
        </Box>
      </Container>
    </>
  )
}
