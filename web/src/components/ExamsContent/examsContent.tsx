import {useEffect, useMemo, useState} from "react";
import {type Course, type ExamGroup, getMethod, getUserInfo, getValidAccessToken} from "../../utils";
import {useNavigate} from "react-router";

export function useExamsContent({course}: { course: Course }) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('student');
  const {id: courseId} = course;

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleCreateExamGroup = () => {
    setIsOpenDialog(true);
  }
  const [examGroups, setExamGroups] = useState<ExamGroup[]>([]);

  const filteredExamGroups: ExamGroup[] = useMemo(() =>
      examGroups.filter(examGroup =>
        examGroup.name.toLowerCase().includes(searchQuery.toLowerCase()))
    , [examGroups, searchQuery]);

  function toDateOnly(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  const today: Date = toDateOnly(new Date());

  const openExamGroups: ExamGroup[] = filteredExamGroups.filter(
    examGroup => toDateOnly(new Date(examGroup.start_time)) <= today
  )

  const notOpenExamGroups: ExamGroup[] = filteredExamGroups.filter(
    examGroup => toDateOnly(new Date(examGroup.start_time)) > today
  )

  const onMounted = async () => {
    const accessToken: string | null = await getValidAccessToken()
    if (!accessToken) {
      console.error('No valid access token, redirecting to login page');
      navigate('/login');
      return;
    }
    const {role} = getUserInfo(accessToken)
    setUserRole(role)

    const examGroupsData: ExamGroup[] = await getMethod(`/exam_groups?class_id=${course.id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setExamGroups(examGroupsData);
    setIsLoading(false);
  }

  useEffect(() => {
    onMounted();
  }, [])

  return {
    courseId, userRole, handleSearchChange, openExamGroups, onMounted, notOpenExamGroups, searchQuery,
    isDeleting, setIsDeleting, isOpenDialog, setIsOpenDialog, isLoading, handleCreateExamGroup
  };
}