import {Container, Box, Typography, CircularProgress} from "@mui/material";
import {ClassControl, GHeader, ClassGrid} from "../../components";
import {type Course, getMethod} from "../../utils";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {isLogin} from "../Login/common.tsx";

const mockCourses: Course[] = [];

const classListPage = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      if (!isLogin()) {
        navigate('/login')
        return
      }
      try {
        if (isMounted) setLoading(true)

        const data = await getMethod<Course[]>('/master/class/')

        if (!isMounted) return

        if (!data) {
          setError('Load data thất bại')
          setCourses(mockCourses)
          return;
        }

        setCourses(data);
        setError(null);
      } catch (e) {
        if (!isMounted) return

        setError('Không thể tải danh sách lớp học');
        setCourses(mockCourses);
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData()

    return () => {
      isMounted = false
    };
  }, [navigate])

  const toAddCourseClick = () => {
    navigate('/class/add');
  }

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

export default classListPage
