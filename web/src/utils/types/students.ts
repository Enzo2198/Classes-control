import type {Action, ExamFile} from "./exams.ts";
import type {Dispatch} from "react";

export interface ExamDoing{
  examName: string,
  examCode: string,
  examFile: ExamFile,
  questions: Answer[],
  timeLeft: number,
  device: string
}

export interface Answer{
  questionId: number,
  questionIndex: number,
  questionType: string,
  answer: string
}

export interface StudentAnswersProps {
  state: ExamDoing,
  dispatch: Dispatch<Action>
}

export interface StudentExamDialogProps {
  timeLeft: number,
  isOpenDialog: boolean,
  setIsOpenDialog: (isOpenDialog: boolean) => void,
  onSubmit: () => Promise<void>,
  handleBackToExamGroupDetail: () => void
}
