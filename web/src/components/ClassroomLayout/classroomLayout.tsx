import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from "react";
import {type Course, type ExamGroup, getMethod, getValidAccessToken} from "../../utils";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";

export function useClassroomLayout() {
  const {id: classId} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [examGroups, setExamGroups] = useState<ExamGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [course, setCourse] = useState<Course>({
    id: 0,
    code: '',
    name: '',
    teachers: [],
    students: []
  });

  // UseMemo to only compute again the menuItems when classId changes
  const menuItems = useMemo(() => {
    return [
      {
        text: "Tổng quan",
        path: `/class/${classId}`,
        segment: undefined,
        icon: <DashboardIcon/>,
      },
      {
        text: "Bài thi",
        path: `/class/${classId}/exam`,
        segment: "exam",
        icon: <AssignmentIcon/>,
      },
      {
        text: "Thành viên",
        path: `/class/${classId}/member`,
        segment: "member",
        icon: <PeopleIcon/>,
      },


    ]
  }, [classId]);

  const isActive = (pathSegment?: string) => {
    if (!classId) return false;

    const basePath = `/class/${classId}`;
    const currentPath = location.pathname.endsWith('/') && location.pathname.length > 1
      ? location.pathname.slice(0, -1)
      : location.pathname;

    if (!pathSegment) {
      return currentPath === basePath;
    }
    return currentPath === `${basePath}/${pathSegment}`;
  }

  useEffect(() => {
    const onMounted = async () => {
      const accessToken: string | null = await getValidAccessToken()
      if (!accessToken) {
        console.error("No valid access token, redirecting to login page");
        navigate("/login");
        return;
      }

      try {
        const [courseData, examGroupsData] = await Promise.all([
          getMethod(`/classes/${classId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),

          getMethod(`/exam_groups?class_id=${classId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
        ])
        setCourse(courseData);
        setExamGroups(examGroupsData);
      } catch (err) {
        console.error('Error loading courses data:', err)
        navigate("/classes")
      } finally {
        setLoading(false);
      }
    }
    onMounted();
  }, [classId]);


  return {course, loading, examGroups, menuItems, isActive,};
}