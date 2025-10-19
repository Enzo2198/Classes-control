export interface ExamFlowContextType {
  isLoading: boolean;
  examsWithStatus: ExamWithStatus[];
  examGroupDetail?: ExamGroup;
  awaitingTime: number;
  isUnlocking: boolean;
  startUnlockTimer: (completedExamId: number) => void;
  initializeExamData: (examGroupId: string) => Promise<void>;
}

export interface ExamGroup {
  id: number,
  name: string,
  class_id: number,
  start_time: string,
  await_time: number,
  created_at: Date,
  is_once: boolean,
  is_save_local: boolean
}

export interface Exam{
  id?: number,
  name: string,
  code: string,
  exam_group_id: number,
  number_of_question: number | string,
  total_time: number,
  questions: Question[],
  description: string,
  file: ExamFile | null,
}

export interface ExamFile{
  id: number | null,
  url?: string,
  file_type?: string
}

export interface Question{
  type: string,
  correct_answer: string,
  index: number,
  id?: number
}

export interface ExamWithStatus extends Exam{
  status: string
}

export interface ExamResult{
  id: number,
  exam_id: number,
  user_id: number,
  status: string,
  answers: AnswerResult[],
  number_of_question: number,
  number_of_correct_answer: number,
  score: number | null,
  created_at: Date,
  device: string
}

export interface AnswerResult{
  id: number | null,
  question_id: number,
  index: number,
  answer: string | null,
  is_correct: boolean[] | null,
  type: string
}