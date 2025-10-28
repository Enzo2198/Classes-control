import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {getUserInfo, getValidAccessToken} from "../../utils";
import StudentExamGroup from "./Student/studentExamGroup.tsx";
import TeacherExamGroup from "./Teacher/Page/examGroup.tsx";

export default function ExamGroup() {
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState<string>('student');

  useEffect(() => {
    const onMounted = async () => {
      const accessToken = await getValidAccessToken()
      if (!accessToken) {
        console.error('No valid access token, redirecting to login page')
        navigate('/login');
        return;
      }
      const {role} = getUserInfo(accessToken);
      setUserRole(role);
    }
    onMounted();
  }, []);

  if (userRole === 'student') {
    return <StudentExamGroup/>
  }
  if (userRole === 'teacher') {
    return <TeacherExamGroup/>
  }
  return <></>
}