interface QuestionExamBaseI {
  exam_id: number;
  question_id: number;
}

export interface QuestionExamI extends QuestionExamBaseI {
  id: number;
}

export interface QuestionExamReqI extends QuestionExamBaseI {}

export interface QuestionExamResI extends QuestionExamI {}