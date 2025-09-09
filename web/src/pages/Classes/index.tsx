import { Container, Box, Typography, CircularProgress } from "@mui/material";
import { ClassControl, GHeader, ClassGrid } from "../../components";
import { useClassListPage } from "./classes.tsx";

export default function classListPage(){
  const { courses, loading, error, toAddCourseClick } = useClassListPage()

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
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

          <ClassControl
            onAddCourseClick={toAddCourseClick}
          />
        </Box>


        <Box sx={{mt: 3}}>
          <ClassGrid courses={courses}/>
        </Box>
      </Container>
    </>
  )
}
