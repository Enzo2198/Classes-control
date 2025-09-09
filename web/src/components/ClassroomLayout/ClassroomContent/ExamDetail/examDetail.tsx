import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {deleteMethod, getMethod, putMethod} from "../../../../utils";
import {useExams} from "../../examsProvider.tsx";
import {useNavigate} from "react-router";

interface putExamProps {
  name: string;
  start_time: string;
  wait_time: number
}

export function useExamDetail() {
  const { examId, id } = useParams<{ examId: string; id: string }>();
  const [exam, setExam] = useState<any>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const { getExams } = useExams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        if (!examId) return;
        const response = await getMethod(`exam_group/${examId}`);
        setExam(response);
      } catch (err) {
        console.error("Lỗi khi load bài thi", err);
      }
    };
    fetchExam();
  }, [examId]);


  const handleUpdateExam = async (data: putExamProps) => {
    try {
      if (!examId) return;
      const response = await putMethod(`exam_group/${examId}`, {
        name: data.name,
        class_id: id,
        await_time: data.wait_time,
        start_time: data.start_time,
      })
      if (!response) throw new Error('Connect server failed')
      setExam(response);
      await getExams();
    } catch (e) {
      console.error(e);
    }
    setOpenEdit(false);
  }

  const deleteExam = async () => {
    try {
      if (!examId) return;
      await deleteMethod(`exam_group/${examId}`);
      await getExams();
      navigate(`/class/${id}/exam`);
    } catch (e) {
      console.error(e);
    }
  }

  return { exam, openEdit, id, examId, setOpenEdit, handleUpdateExam, deleteExam };
}