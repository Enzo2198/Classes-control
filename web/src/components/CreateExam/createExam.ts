import { useState } from "react";

export function useCreateExam() {
  const [form, setForm] = useState({
    title: "",
    code: "",
    duration: "",
    questionCount: 1,
    answers: {} as Record<number, { answerType: string; correctAnswer: string }>,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (index: number, key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [index]: {
          ...prev.answers[index],
          [key]: value,
        },
      },
    }));
  };

  return { form, handleInputChange, handleAnswerChange };
}