import {useCallback, useEffect, useMemo, useState, type ReactNode, createContext, useContext} from "react";
import { useNavigate } from "react-router-dom";
import {
  type Exam,
  type ExamFlowContextType,
  type ExamGroup,
  type ExamResult,
  type ExamWithStatus,
  getMethod, getValidAccessToken
} from "../utils";
import { jwtDecode } from "jwt-decode";

// Create the context
export const ExamFlowContext = createContext<ExamFlowContextType | null>(null);

export const useExamFlow = () => {
  const context = useContext(ExamFlowContext);
  if (!context) {
    throw new Error('useExamFlow must be inside an ExamFlowProvider');
  }
  return context;
}

export function ExamFlowProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [examGroupDetail, setExamGroupDetail] = useState<ExamGroup | undefined>(undefined);
  const [examsWithStatus, setExamsWithStatus] = useState<ExamWithStatus[]>([]);
  const [awaitingTime, setAwaitingTime] = useState(-1);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [activeExamGroupId, setActiveExamGroupId] = useState<string | null>(null);

  /************** Initialize Exam Data **************/
  const initializeExamData = useCallback(async (examGroupId: string) => {
    if (!examGroupId) {
      setIsLoading(false);
      return;
    }

    setActiveExamGroupId(examGroupId);
    setIsLoading(true);

    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      navigate("/login");
      return;
    }

    // Decode userId từ accessToken
    let currentUserId: number | null = null;
    try {
      const decoded = jwtDecode<{ sub: string }>(accessToken);
      currentUserId = Number(decoded.sub);
      setUserId(currentUserId);
    } catch (err) {
      console.error("Invalid access token:", err);
      navigate("/login");
      return;
    }

    try {
      const [examGroupData, exams, examResults] = await Promise.all([
        getMethod(`/exam_groups/${examGroupId}`, { headers: { Authorization: `Bearer ${accessToken}` } }),
        getMethod(`/exams/?exam_group_id=${examGroupId}`, { headers: { Authorization: `Bearer ${accessToken}` } }),
        getMethod(`/exam_results/?student_id=${currentUserId}&exam_group_id=${examGroupId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ]);

      setExamGroupDetail(examGroupData);

      // Handle exam status
      let processedExams: ExamWithStatus[] = exams.map((exam: Exam) => ({
        ...exam,
        status: examResults.some((r: ExamResult) => r.exam_id === exam.id) ? "completed" : "locked",
      }));

      const unlockStartTime = localStorage.getItem(`unlockStartTime-${currentUserId}-${examGroupId}`);
      const unlockingExamId = localStorage.getItem(`unlockingExamId-${currentUserId}-${examGroupId}`);

      if (unlockStartTime && unlockingExamId) {
        const elapsed = Math.floor((Date.now() - parseInt(unlockStartTime)) / 1000);
        const remainingTime = examGroupData.await_time - elapsed;

        if (remainingTime > 0) {
          processedExams = processedExams.map((exam) =>
            exam.id === Number(unlockingExamId) ? { ...exam, status: "unlocking" } : exam
          );
          setIsUnlocking(true);
          setAwaitingTime(remainingTime);
        } else {
          processedExams = processedExams.map((exam) =>
            exam.id === Number(unlockingExamId) ? { ...exam, status: "unlocked" } : exam
          );

          localStorage.removeItem(`unlockStartTime-${currentUserId}-${examGroupId}`);
          localStorage.removeItem(`unlockingExamId-${currentUserId}-${examGroupId}`);
        }
      } else {
        const hasActiveExam = processedExams.some((e) => ["unlocked", "unlocking"].includes(e.status));
        if (!hasActiveExam) {
          const firstLockedIndex = processedExams.findIndex((e) => e.status === "locked");
          if (firstLockedIndex !== -1) {
            processedExams = processedExams.map((exam, index) =>
              index === firstLockedIndex ? { ...exam, status: "unlocked" } : exam
            );
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

  /************** Start Unlock Timer **************/
  const startUnlockTimer = useCallback(
    (completedExamId: number) => {
      if (!examGroupDetail || !userId || !activeExamGroupId) return;

      setExamsWithStatus((prevExams) => {
        let nextExamToUnlockId: number | undefined;
        const completedIndex = prevExams.findIndex((exam) => exam.id === completedExamId);

        for (let i = completedIndex + 1; i < prevExams.length; i++) {
          if (prevExams[i].status === "locked") {
            nextExamToUnlockId = prevExams[i].id;
            break;
          }
        }

        if (nextExamToUnlockId) {
          localStorage.setItem(`unlockStartTime-${userId}-${activeExamGroupId}`, Date.now().toString());
          localStorage.setItem(`unlockingExamId-${userId}-${activeExamGroupId}`, nextExamToUnlockId.toString());
          setIsUnlocking(true);
          setAwaitingTime(examGroupDetail.await_time);
        }

        return prevExams.map((exam) => {
          if (exam.id === completedExamId) return { ...exam, status: "completed" };
          if (exam.id === nextExamToUnlockId) return { ...exam, status: "unlocking" };
          return exam;
        });
      });
    },
    [examGroupDetail, userId, activeExamGroupId]
  );

  /************** Countdown **************/
  useEffect(() => {
    if (!isUnlocking || awaitingTime <= 0) return;
    const interval = setInterval(() => setAwaitingTime((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [isUnlocking, awaitingTime]);

  /************** Unlock when timeout **************/
  useEffect(() => {
    if (isUnlocking && awaitingTime === 0) {
      if (userId && activeExamGroupId) {
        const unlockingExamId = localStorage.getItem(`unlockingExamId-${userId}-${activeExamGroupId}`);
        if (unlockingExamId) {
          setExamsWithStatus((prevExams) =>
            prevExams.map((exam) =>
              exam.id === Number(unlockingExamId) ? { ...exam, status: "unlocked" } : exam
            )
          );
        }
        localStorage.removeItem(`unlockStartTime-${userId}-${activeExamGroupId}`);
        localStorage.removeItem(`unlockingExamId-${userId}-${activeExamGroupId}`);
      }
      setIsUnlocking(false);
      setAwaitingTime(-1);
    }
  }, [isUnlocking, awaitingTime, userId, activeExamGroupId]);

  const value = useMemo(() => ({
    isLoading,
    examsWithStatus,
    examGroupDetail,
    awaitingTime,
    isUnlocking,
    startUnlockTimer,
    initializeExamData,
  }), [
    isLoading,
    examsWithStatus,
    examGroupDetail,
    awaitingTime,
    isUnlocking,
    startUnlockTimer,
    initializeExamData,
  ]);

  return <ExamFlowContext.Provider value={value}>{children}</ExamFlowContext.Provider>;
}
