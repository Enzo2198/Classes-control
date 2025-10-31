// import {useEffect, useReducer, useState} from "react";
// import {useNavigate, useParams, useSearchParams} from "react-router-dom";
// import {toast} from "react-toastify";
// import {initState, reducer } from "./reducer";
// import {isMobile, isTablet, isDesktop} from "react-device-detect";
// import { useExamFlow } from "../../../../contexts/ExamFlowProvider";
// import {getValidAccessToken, type Answer, postMethod, getUserInfo, getMethod, type Question} from "../../../../utils";
//
// export default function useStudentExamDetail() {
//   const [state, dispatch] = useReducer(reducer, initState);
//   const [userId, setUserId] = useState<number>(0);
//   const [isDataReady, setIsDataReady] = useState(false);
//
//   const navigate = useNavigate();
//   const {id, examGroupId} = useParams();
//   const [searchParams] = useSearchParams();
//   const examId: string | null = searchParams.get('lesson');
//
//   const handleBackToExamGroupDetail = () => {
//     navigate(`/class/${id}/exam/${examGroupId}`);
//   }
//
//   const getDeviceType = () => {
//     if (isMobile) {
//       return 'mobile';
//     }
//     if (isTablet) {
//       return 'tablet';
//     }
//     if (isDesktop) {
//       return 'desktop';
//     }
//     return 'unknown';
//   }
//
//   // get functions from context
//   const {startUnlockTimer, initializeExamData} = useExamFlow();
//
//   // load examGroupDetail to context
//   useEffect(() => {
//     if (examGroupId) {
//       initializeExamData(examGroupId);
//     }
//   }, [examGroupId, initializeExamData]);
//
//   const [isOpenDialog, setIsOpenDialog] = useState(false);
//
//   const onSubmit = async () => {
//     const accessToken: string | null = await getValidAccessToken();
//     if (!accessToken) {
//       toast.error("Có lỗi xảy ra: Phiên đăng nhập không hợp lệ!");
//       navigate('/login');
//       return;
//     }
//
//     const payload = {
//       exam_id: Number(examId),
//       user_id: userId,
//       status: 'completed',
//       questions: state.questions.map((question: Answer) => (
//         {
//           question_id: question.questionId,
//           answer: question.answer
//         }
//       )),
//       device: state.device
//     }
//
//     const response = await postMethod('/exam_results', payload, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     })
//     if (!response) {
//       toast.error('Nộp bài không thành công!');
//     } else {
//       toast.success('Nộp bài thành công');
//       // clear localStorage
//       localStorage.removeItem(`lesson-${examId}-${userId}-answers`);
//       localStorage.removeItem(`lesson-${examId}-${userId}-time`);
//
//       // start counting down to unlock the next exam (if any)
//       startUnlockTimer(Number(examId));
//     }
//   }
//
//   const handleSubmitEarly = () => {
//     setIsOpenDialog(true);
//   }
//
//   useEffect(() => {
//     const onMounted = async () => {
//       const accessToken: string | null = await getValidAccessToken();
//       if (!accessToken) {
//         console.error("No valid access token, redirecting to login page");
//         navigate('/login');
//         return;
//       }
//
//       const {sub} = getUserInfo(accessToken);
//       setUserId(Number(sub));
//
//       // Get examId from query param
//       if (!examId) {
//         toast.error("Không xác định được bài thi!");
//         navigate(`/class/${id}/exam/${examGroupId}`);
//         return;
//       }
//
//       try {
//         const examData = await getMethod(`/exams/${examId}`, {
//           headers: {Authorization: `Bearer ${accessToken}`}
//           })
//
//         if (!examData) {
//           toast.error("Bạn không có quyền xem bài thi này hoặc bài thi không tồn tại!");
//           navigate(`/class/${id}/exam/${examGroupId}`);
//           return;
//         }
//
//         const totalTime = typeof examData.total_time === "number" ? examData.total_time : 3600;
//
//         const savedQuestions: string | null = localStorage.getItem(`lesson-${examId}-${sub}-answers`);
//         const savedTimeLeft: string | null = localStorage.getItem(`lesson-${examId}-${sub}-time`);
//
//         const questions = savedQuestions
//           ? JSON.parse(savedQuestions)
//           : examData.questions.map((question: Question) => ({
//             questionId: question.id,
//             questionIndex: question.index,
//             questionType: question.type,
//             answer: ''
//           }));
//
//         const timeLeft = savedTimeLeft ? Number(savedTimeLeft) : totalTime;
//
//         const payload = {
//           examName: examData.name || "Bài thi",
//           examCode: examData.code || "",
//           examFile: examData.file || { id: null, url: undefined, file_type: undefined },
//           questions,
//           timeLeft,
//           device: getDeviceType()
//         };
//
//         dispatch({ type: 'LOAD_INITIAL_DATA', payload });
//         setIsDataReady(true);
//       } catch (error) {
//         console.error("Lỗi khi load bài thi:", error);
//         toast.error("Có lỗi xảy ra khi tải bài thi!");
//         navigate(`/class/${id}/exam/${examGroupId}`);
//       }
//     };
//     onMounted();
//   }, []);
//
//   useEffect(() => {
//     // timeout
//     if (state.timeLeft <= 0 && isDataReady) {
//       setIsOpenDialog(true);
//       // automatically submit answers
//       onSubmit();
//     } else {
//       // countdown to 0
//       const interval = setInterval(() => {
//         dispatch({type: 'COUNTDOWN'})
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [state.timeLeft, isDataReady]);
//
//   useEffect(() => {
//     if (userId && examId && isDataReady) {
//       // save answers to localStorage each time there is a change
//       localStorage.setItem(
//         `lesson-${examId}-${userId}-answers`,
//         JSON.stringify(state.questions)
//       );
//
//       // save remaining time to localStorage every second
//       localStorage.setItem(
//         `lesson-${examId}-${userId}-time`,
//         state.timeLeft.toString()
//       );
//     }
//   }, [state.questions, state.timeLeft, userId, examId, isDataReady]);
//
//   return {
//     state,
//     dispatch,
//     handleSubmitEarly,
//     isOpenDialog,
//     setIsOpenDialog,
//     onSubmit,
//     handleBackToExamGroupDetail
//   }
// }