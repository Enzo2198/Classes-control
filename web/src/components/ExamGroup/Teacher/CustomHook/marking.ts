import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import {useParams} from "react-router-dom";
import {getMethod, type Exam, type ExamGroup, type ExamResult, getValidAccessToken} from "../../../../utils";
import { toast } from "react-toastify";

export default function useTeacherMarking() {
  const navigate = useNavigate();
  const {id, examGroupId} = useParams();
  const [searchParams] = useSearchParams();
  const studentId: string | null = searchParams.get('student');
  const [isLoading, setIsLoading] = useState(true);

  const handleBackToExamGroup = () => {
    navigate(`/class/${id}/exam/${examGroupId}`);
  }

  const [examGroup, setExamGroup] = useState<ExamGroup | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);

  const matchExam = (examResult: ExamResult) => {
    return exams.find(exam => exam.id === examResult.exam_id);
  }

  const fetchResultData = async () => {
    const accessToken: string | null = await getValidAccessToken();
    if (!accessToken) {
      console.error("No valid access token, redirecting to login page");
      navigate('/login');
      return;
    }

    try {
      // Only exam results data need to fetch (reload)
      const examResultsData = await getMethod(`/exam_results?student_id=${studentId}&exam_group_id=${examGroupId}`, {headers: {Authorization: `Bearer ${accessToken}`}});
      if (examResultsData) {
        setExamResults(examResultsData.sort((a: ExamResult, b: ExamResult) => a.exam_id - b.exam_id));
      }
    } catch (e) {
      console.error('Error on re-loading exam results: ', e);
      toast.error('Không thể làm mới dữ liệu!')
    }
  }

  useEffect(() => {
    const onInitialMount = async () => {
      setIsLoading(true);
      const accessToken: string | null = await getValidAccessToken();
      if (!accessToken) {
        console.error("No valid access token, redirecting to login page");
        navigate('/login');
      }

      try {
        const [examResultsData, examsData, examGroupData] = await Promise.all([
          getMethod(`/exam_results?student_id=${studentId}&exam_group_id=${examGroupId}`, {headers: {Authorization: `Bearer ${accessToken}`}}),
          getMethod(`/exams?exam_group_id=${examGroupId}`, {headers: {Authorization: `Bearer ${accessToken}`}}),
          getMethod(`/exam_groups/${examGroupId}`, {headers: {Authorization: `Bearer ${accessToken}`}})
        ]);

        // sort by exam id
        if (examResultsData) setExamResults(examResultsData.sort((a: ExamResult, b: ExamResult) => a.exam_id - b.exam_id));
        if (examsData) setExams(examsData.sort((a: Exam, b: Exam) => a.id! - b.id!));

        if (examGroupData) setExamGroup(examGroupData);
      } catch (e) {
        console.error('Error on loading data: ', e);
        toast.error('Có lỗi khi tải dữ liệu!')
      } finally{
        setIsLoading(false);
      }
    }

    onInitialMount();
  }, []);

  return {handleBackToExamGroup, examGroup, examResults, matchExam, fetchResultData, isLoading}
}