import {useReducer, useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {isMobile, isTablet, isDesktop} from "react-device-detect";
import {toast} from "react-toastify";
import {initState, reducer} from "./reducer.ts";
import {useExamFlow} from "../../../../contexts/ExamFlowProvider";
import {getValidAccessToken, type Answer, postMethod, getUserInfo, getMethod, type Question} from "../../../../utils";

export default function useExamDetail() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [userId, setUserId] = useState<number>(0);
  const [isDataReady, setIsDataReady] = useState(false);

  const navigate = useNavigate();
  const {id, examGroupId} = useParams();
  const [searchParams] = useSearchParams();
  const examId: string | null = searchParams.get('lesson');
  const {startUnlockTimer, initializeExamData} = useExamFlow();

  const handleBackToExamGroupDetail = () => {
    navigate(`/class/${id}/exam/${examGroupId}`);
  }

  const getDeviceType = () => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    if (isDesktop) return 'desktop';
    return 'unknown';
  }

  // Load examGroupDetail to context
  useEffect(() => {
    if (examGroupId) {
      initializeExamData(examGroupId);
    }
  }, [examGroupId, initializeExamData]);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const onSubmit = async () => {
    const accessToken: string | null = await getValidAccessToken();
    if (!accessToken) {
      toast.error("Có lỗi xảy ra: Phiên đăng nhập không hợp lệ!");
      navigate('/login');
      return;
    }

    const payload = {
      exam_id: Number(examId),
      user_id: userId,
      status: 'completed',
      questions: state.questions.map((question: Answer) => ({
        question_id: question.questionId,
        answer: question.answer
      })),
      device: state.device
    }

    try {
      const response = await postMethod('/exam_results', payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response) {
        toast.error('Nộp bài không thành công!');
      } else {
        toast.success('Nộp bài thành công');
      }


      // Clear localStorage
      localStorage.removeItem(`lesson-${examId}-${userId}-answers`);
      localStorage.removeItem(`lesson-${examId}-${userId}-time`);

      handleBackToExamGroupDetail()

      // Start counting down to unlock the next exam
      startUnlockTimer(Number(examId));

    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error('Nộp bài không thành công!');
    }
  }

  const handleSubmitEarly = () => {
    setIsOpenDialog(true);
  }

  useEffect(() => {
    const onMounted = async () => {

      const accessToken: string | null = await getValidAccessToken();
      if (!accessToken) {
        console.error("No valid access token, redirecting to login page");
        navigate('/login');
        return;
      }

      const {sub} = getUserInfo(accessToken);
      setUserId(Number(sub));

      const examData = await getMethod(`/exams/${examId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const savedQuestions: string | null = localStorage.getItem(`lesson-${examId}-${sub}-answers`);
      const savedTimeLeft: string | null = localStorage.getItem(`lesson-${examId}-${sub}-time`);

      const questions = savedQuestions ?
        JSON.parse(savedQuestions) :
        examData.questions.map((question: Question) => ({
          questionId: question.id,
          questionIndex: question.index,
          questionType: question.type,
          answer: ''
        }));

      const timeLeft = savedTimeLeft ?
        Number(savedTimeLeft) :
        examData.total_time;

      const payload = {
        examName: examData.name,
        examCode: examData.code,
        examFile: examData.file,
        questions: questions,
        timeLeft: timeLeft,
        device: getDeviceType()
      }

      dispatch({type: 'LOAD_INITIAL_DATA', payload: payload});
      setIsDataReady(true);
    }
    onMounted();
  }, [navigate, examId]);

  useEffect(() => {
    // timeout
    if (state.timeLeft <= 0 && isDataReady) {
      setIsOpenDialog(true);
      // automatically submit answers
      onSubmit();
    } else {
      // countdown to 0
      const interval = setInterval(() => {
        dispatch({type: 'COUNTDOWN'})
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.timeLeft, isDataReady]);

  useEffect(() => {
    if (userId && examId && isDataReady) {
      // save answers to localStorage each time there is a change
      localStorage.setItem(
        `lesson-${examId}-${userId}-answers`,
        JSON.stringify(state.questions)
      );

      // save remaining time to localStorage every second
      localStorage.setItem(
        `lesson-${examId}-${userId}-time`,
        state.timeLeft.toString()
      );
    }
  }, [state.questions, state.timeLeft, userId, examId, isDataReady]);

  return {isOpenDialog, handleBackToExamGroupDetail, handleSubmitEarly, state, dispatch, setIsOpenDialog, onSubmit};
}