import {type Course, getMethod, getUserInfo, getValidAccessToken} from "../../utils";
import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router";

export function useClassPage() {
  const [user, setUser] = useState({name: "", role: ""})
  const [courses, setCourses] = useState<Course[]>([])
  const [search, setSearch] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const displayAddClassButton = user?.role === 'teacher' ? 'inline-flex' : 'none';

  const filteredCourses: Course[] = useMemo(() => courses.filter(course => {
    return course.name.toLowerCase().includes(search.toLowerCase());
  }), [courses, search]);

  useEffect(() => {
      const onMounted = async () => {
        const accessToken: string | null = await getValidAccessToken()
        if (!accessToken) {
          console.error("Access token not found")
          navigate("/login")
          return
        }

        const {name, role} = getUserInfo(accessToken);
        setUser({name, role});

        try {
          const coursesData: Course[] = await getMethod('/classes', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          setCourses(coursesData)
        } catch (err) {
          console.error("Error on loading courses", err)
        } finally {
          setIsLoading(false)
        }
      }
      onMounted()
    }, []);

  const toAddCourseClick = () => {
    navigate('/class/add');
  }

  return {toAddCourseClick, displayAddClassButton, setSearch, filteredCourses, courses, isLoading}
}