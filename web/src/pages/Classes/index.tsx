import {Container, Box, Typography, Button, TextField, InputAdornment} from "@mui/material";
import {GHeader, ClassGrid, Loading} from "../../components";
import {useClassPage} from "./classes.ts";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import type {ChangeEvent} from "react";


export default function ClassPage() {
  const {
    toAddCourseClick,
    displayAddClassButton,
    setSearch,
    filteredCourses,
    isLoading,
  } = useClassPage()

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  if (isLoading) return <Loading />

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
          mb: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{fontWeight: 'bold', color: '#333'}}>
            Danh sách lớp học
          </Typography>

          <Box sx={{display: 'flex', alignItems: 'center', gap: 2, my: 2}}>
            <TextField
              variant="outlined"
              onChange={handleSearchChange}
              placeholder="Tìm kiếm lớp học..."
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
