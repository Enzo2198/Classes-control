import {useLocation, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from "react";
import {getMethod, type Member} from "../../utils";

interface Exam {
  id: string;
  [key: string]: string;
}

export function useClassroomLayout() {
  const {id} = useParams<{ id: string }>();
  const location = useLocation();

  const [members, setMembers] = useState<Member[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Members
  const fetchMembers = useCallback(async () => {
    if (!id) return;
    try {
      const response = await getMethod<{ users: Member[] }>(`master/class/${id}`);
      setMembers(response?.users ?? [])
    } catch (error) {
      console.error('Failed to fetch members:', error);
      setError('Failed to fetch members')
    }
  }, [id])

  // Fetch Exams
  const fetchExams = useCallback(async () => {
    if (!id) return;
    try {
      const response = await getMethod(`exam_group/?class_id=${id}`);
      setExams(response as Exam[]);
    } catch (error) {
      console.error('Failed to fetch exams:', error);
      setError('Failed to fetch exams')
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    setLoading(true)
    Promise.all([fetchMembers(), fetchExams()])
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [id, fetchMembers, fetchExams]);

  // Selected index
  const pathname = location.pathname;
  const selectedIndex = pathname.includes('/exam') ? 1
    : pathname.includes('/members') ? 2 : 0;

  return {
    selectedIndex,
    exams,
    members,
    refetch: {members: fetchMembers, exams: fetchExams},
    loading,
    error,
  };
}