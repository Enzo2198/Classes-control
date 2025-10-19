import {type Course, getMethod} from "../../utils";
import {useEffect, useMemo, useState} from "react";
import {isLogin} from "../Login/common.tsx";
import {useNavigate} from "react-router";
import {useUser} from "../../plugins/user.ts";

const mockCourses: Course[] = [];

export function useClassListPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")
  const navigate = useNavigate()
  const {user} = useUser();

  const displayAddClassButton = user?.role === 'teacher' ? 'inline-flex' : 'none';
  const filteredCourses: Course[] = useMemo(() => courses.filter(course => {
    return course.name.toLowerCase().includes(search.toLowerCase());
  }), [courses, search]);

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      if (!isLogin()) {
        navigate('/login')
        return
      }
      try {
        if (isMounted) setLoading(true)

        const data: Course[] = await getMethod('/classes')

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

  return {loading, error, toAddCourseClick, displayAddClassButton, setSearch, filteredCourses}
}