import { type Course, getMethod } from "../../utils";
import { useEffect, useState } from "react";
import { isLogin } from "../Login/common.tsx";
import { useNavigate } from "react-router";

const mockCourses: Course[] = [];

export function useClassListPage(){
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

    return { courses, loading, error, toAddCourseClick }
}