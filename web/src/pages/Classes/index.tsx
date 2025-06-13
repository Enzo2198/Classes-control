import {Container, Box, Typography} from "@mui/material";
import {ClassControl, GHeader, ClassGrid} from "../../components";
import type {Course} from "../../utils";

const mockCourses: Course[] = [
  {id: '19', name: 'Test Thi Thu', memberCount: 1, classCode: '123456'},
  {id: '2', name: 'lol', memberCount: 1, classCode: '123456'},
  {id: '3', name: 'A1', memberCount: 1, classCode: '123456'},
  {id: '4', name: 'A2', memberCount: 1, classCode: '123456'},
];

export default () => {
  const toAddCourseClick = () => {
    console.log('add course')
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
          <ClassGrid courses={mockCourses}/>
        </Box>
      </Container>
    </>
  )
}
