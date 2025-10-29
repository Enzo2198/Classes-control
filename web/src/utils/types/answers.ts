import type {Action, Exam, ExamResult, Question} from "./exams";
import type {Dispatch} from "react";

export interface TeacherAnswersProps {
  handleBackToExamGroupDetail: () => void,
  examGroupIdNum: number,
  examIdNum: number,
  state: Exam,
  dispatch: Dispatch<Action>,
  selectedFile: File | null,
}

export interface QuestionUnitProps {
  question: Question,
  onTypeChange: (index: number, questionType: string) => void,
  onAnswerChange: (index: number, type: 'single-choice' | 'multiple-choice', value: string, checked?: boolean) => void,
  isDisplay: boolean,
}

export type ExamFormValidationData = {
  name: string,
  code: string,
  total_time: number,
  questions: Question[],
  number_of_question: number | string,
  fileUrl?: string,
}

export interface ExamFormData extends ExamFormValidationData {
  examGroupIdNum: number,
  examIdNum: number,
  description: string,
  selectedFile: File | null,
}

export interface QuestionI {
  id: number;
  index: number;
  type: string;
  isCorrect: boolean | null;
  answer: string | null;
  isInitiallyMarked: boolean;
}

export interface RemarkingDetailProps {
  examResult: ExamResult;
  exam: Exam;
  onSaveSuccess: () => Promise<void>;
}