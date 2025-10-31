import {type ChangeEvent, type FormEvent, useCallback, useState} from "react";
import type {TeacherAnswersProps} from "../../../../utils";
import {validateExamForm} from "./validation.ts";
import {toast} from "react-toastify";
import {submitExam} from "./submitExam.ts";

export default function useTeacherAnswers(
  {handleBackToExamGroupDetail, examGroupIdNum, examIdNum, state, dispatch, selectedFile}: TeacherAnswersProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const useInputChange = (actionType: string) => {
    return useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const value: string | number = actionType === 'SET_AMOUNT' ? Number(e.target.value) : e.target.value;
      dispatch({ type: actionType, payload: value });
    }, [dispatch, actionType]);
  };

  const handlers = {
    onNameChange: useInputChange('SET_NAME'),
    onCodeChange: useInputChange('SET_CODE'),
    onTotalTimeChange: useInputChange('SET_TOTAL_TIME'),
    onAmountChange: useInputChange('SET_AMOUNT'),
    onTypeChange: useCallback((index: number, questionType: string) => {
      dispatch({type: 'CHANGE_QUESTION_TYPE', payload: {index, questionType}})
    }, [dispatch]),

    onAnswerChange: useCallback(
      (index: number, type: 'single-choice' | 'multiple-choice', value: string, checked?: boolean) => {
        const payload = {targetedAnswer: value, index: index};

        if (type === 'single-choice') {
          dispatch({type: 'SINGLE_CHANGE_CORRECT_ANSWER', payload: payload});
        } else if (type === 'multiple-choice') {
          if (checked) {
            dispatch({type: 'MULTIPLE_CHECK_OPTION', payload: payload});
          } else {
            dispatch({type: 'MULTIPLE_UNCHECK_OPTION', payload: payload});
          }
        }
      }, [dispatch]),
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // validation
    const validationResult = validateExamForm({
      name: state.name,
      code: state.code,
      total_time: state.total_time,
      questions: state.questions,
      fileUrl: state.file?.url,
      number_of_question: Number(state.number_of_question)
    });

    if(!validationResult.isValid){
      toast.error(validationResult.message);
      setIsLoading(false);
      return;
    }

    // submission
    try{
      const response = await submitExam({...state, examGroupIdNum, examIdNum, selectedFile});
      if(response) {
        toast.success(examIdNum ? 'Chỉnh sửa đề thi thành công!' : 'Tạo đề thi thành công!');
        handleBackToExamGroupDetail();
      } else {
        toast.error(`Mã đề ${state.code} đã có`)
      }

    } catch (e: any) {
      console.error('Submission failed: ', e);
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { handlers, handleSubmit, isLoading, setIsLoading };
}