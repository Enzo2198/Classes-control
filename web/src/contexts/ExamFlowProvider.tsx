import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import {useNavigate} from "react-router-dom";
import {
  type Exam, type ExamFlowContextType,
  type ExamGroup,
  type ExamResult,
  type ExamWithStatus,
  getMethod,
  getUserInfo,
  getValidAccessToken,
} from "../utils";

// Create the context
export const ExamFlowContext = createContext<ExamFlowContextType | null>(null);

// Create a custom hook to use the context
export const useExamFlow = () => {
  const context = useContext(ExamFlowContext);
  if (!context) {
    throw new Error("useExamFlow must be used inside an ExamFlowProvider");
  }
  return context;
}

export function ExamFlowProvider({children}: { children: ReactNode }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [examGroupDetail, setExamGroupDetail] = useState<ExamGroup | undefined>(undefined);
  const [examsWithStatus, setExamsWithStatus] = useState<ExamWithStatus[]>([]);
  const [awaitingTime, setAwaitingTime] = useState(-1);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [activeExamGroupId, setActiveExamGroupId] = useState<string | null>(null);

  const initializeExamData = useCallback(async (examGroupId: string) => {
    if (!examGroupId) {
      setIsLoading(false);
      return;
    }

    setActiveExamGroupId(examGroupId);
    setIsLoading(true);

    const accessToken = await getValidAccessToken();
    if (!accessToken) { navigate('/login'); return; }

    const userInfo = getUserInfo(accessToken);
    if (!userInfo || !userInfo.sub) { navigate('/login'); return; }

    const currentUserId: number = Number(userInfo.sub);
    setUserId(currentUserId);

    try {
      const [examGroupData, exams, examResults] = await Promise.all([
        getMethod(`/exam_groups/${examGroupId}`, {headers: {Authorization: `Bearer ${accessToken}`}}),
        getMethod(`/exams/?exam_group_id=${examGroupId}`, {headers: {Authorization: `Bearer ${accessToken}`}}),
        getMethod(`/exam_results/?student_id=${currentUserId}&exam_group_id=${examGroupId}`, {headers: {Authorization: `Bearer ${accessToken}`}})
      ]);
      setExamGroupDetail(examGroupData);

      let processedExams: ExamWithStatus[] = exams.map((exam: Exam) => ({
        ...exam,
        status: examResults.some((r: ExamResult) => r.exam_id === Number(exam.id)) ? 'completed' : 'locked'
      }));

      const unlockStartTime: string | null = localStorage.getItem(`unlockStartTime-${currentUserId}-${examGroupId}`);
      const unlockingExamId: string | null = localStorage.getItem(`unlockingExamId-${currentUserId}-${examGroupId}`);

      if (unlockStartTime && unlockingExamId) {
        const elapsed: number = Math.floor((Date.now() - parseInt(unlockStartTime)) / 1000);
        const remainingTime: number = examGroupData.await_time - elapsed;

        if (remainingTime > 0) {
          processedExams = processedExams.map(exam => exam.id === Number(unlockingExamId) ? { ...exam, status: 'unlocking' } : exam);
          setIsUnlocking(true);
          setAwaitingTime(remainingTime);
        } else {
          // when timeout, change status from 'unlocking' to 'unlocked' and clear localStorage
          processedExams = processedExams.map(exam => exam.id === Number(unlockingExamId) ? { ...exam, status: 'unlocked' } : exam);

          localStorage.removeItem(`unlockStartTime-${currentUserId}-${examGroupId}`);
          localStorage.removeItem(`unlockingExamId-${currentUserId}-${examGroupId}`);
        }
      } else {
        const hasActiveExam: boolean = processedExams.some(e => ['unlocked', 'unlocking'].includes(e.status));
        // if there is no 'unlocking' or 'unlocked' exam, unlock a 'locked' exam (if any)

        if (!hasActiveExam) {
          const firstLockedIndex: number = processedExams.findIndex(e => e.status === 'locked');
          if (firstLockedIndex !== -1) {
            processedExams = processedExams.map((exam, index) => index === firstLockedIndex ? { ...exam, status: 'unlocked' } : exam);
          }
        }
      }

      setExamsWithStatus(processedExams);
    } catch (error) {
      console.error("Error initializing exam data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const startUnlockTimer = useCallback((completedExamId: number) => {
    if (!examGroupDetail || !userId || !activeExamGroupId) return;

    // pick one from locked exams to unlock
    setExamsWithStatus(prevExams => {
      let nextExamToUnlockId: number | undefined;
      const completedIndex: number = prevExams.findIndex(exam => Number(exam.id) === completedExamId);

      for (let i = completedIndex + 1; i < prevExams.length; i++) {
        if (prevExams[i].status === 'locked') {
          nextExamToUnlockId = Number(prevExams[i].id);
          break;
        }
      }

      if (nextExamToUnlockId) {
        localStorage.setItem(`unlockStartTime-${userId}-${activeExamGroupId}`, Date.now().toString());
        localStorage.setItem(`unlockingExamId-${userId}-${activeExamGroupId}`, nextExamToUnlockId.toString());
        setIsUnlocking(true);
        setAwaitingTime(examGroupDetail.await_time);
      }


      return prevExams.map(exam => {
        if (exam.id === completedExamId) return { ...exam, status: 'completed' };
        if (exam.id === nextExamToUnlockId) return { ...exam, status: 'unlocking' };
        return exam;
      });
    });
  }, [examGroupDetail, userId, activeExamGroupId]);

  // countdown
  useEffect(() => {
    if (!isUnlocking || awaitingTime <= 0) return;
    const interval = setInterval(() => setAwaitingTime(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [isUnlocking, awaitingTime]);

  // timeout scenario, change the exam's status from 'unlocking' to 'unlocked' and clear localStorage
  useEffect(() => {
    if (isUnlocking && awaitingTime === 0) {
      if (userId && activeExamGroupId) {
        const unlockingExamId: string | null = localStorage.getItem(`unlockingExamId-${userId}-${activeExamGroupId}`);
        if (unlockingExamId) {
          setExamsWithStatus(prevExams =>
            prevExams.map(exam =>
              exam.id === Number(unlockingExamId)
                ? { ...exam, status: 'unlocked' }
                : exam
            )
          );

          setAwaitingTime(-1); // Reset awaitingTime
        }
        localStorage.removeItem(`unlockStartTime-${userId}-${activeExamGroupId}`);
        localStorage.removeItem(`unlockingExamId-${userId}-${activeExamGroupId}`);

        initializeExamData(activeExamGroupId);
      }
      setIsUnlocking(false);
    }
  }, [isUnlocking, awaitingTime, userId, activeExamGroupId]);

  const value = { isLoading, examsWithStatus, examGroupDetail, awaitingTime,
    isUnlocking, startUnlockTimer, initializeExamData, setExamsWithStatus };

  return <ExamFlowContext.Provider value={value}>{children}</ExamFlowContext.Provider>;
}