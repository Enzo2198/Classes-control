import {Typography, Box, Grid} from "@mui/material";

import {ClassCard} from '../index.tsx';
import type {Course} from '../../utils';

interface CourseGridProps {
  courses: Course[];
}

const CourseGrid = ({courses}: CourseGridProps) => {
  if (!courses || courses.length === 0) {
    return (
      <Box sx={{textAlign: 'center', mt: 5}}>
        <Typography variant="h6" color="text.secondary">
          Không tìm thấy lớp học nào.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid key={course.id} size={{sm: 12, md: 6, lg: 4}}>
          <ClassCard course={course}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseGrid;