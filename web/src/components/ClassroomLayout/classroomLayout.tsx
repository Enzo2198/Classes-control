import {useLocation, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getMethod, type Member} from "../../utils";



export function useClassroomLayout() {
  const {id} = useParams<{ id: string }>();

  // Get Members
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    const getMembers = async () => {
      try {
        if (!id) return;
        const response = await getMethod<{ users: Member[] }>(`master/class/${id}`);
        if (response?.users) return setMembers(response.users);
      } catch (error) {
        console.error('Failed to fetch members:', error);
      }
    };
    getMembers();
  }, [id]);

  // Get Exams
  const [exams, setExams] = useState<any[]>([]);
  const getExams = async () => {
    try {
      if (!id) return;
      const response = await getMethod(`exam_group/?class_id=${id}`);
      setExams(response as any[]);
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    }
  };
  useEffect(() => {
    getExams();
  }, [id]);


  const location = useLocation();
  const pathname = location.pathname;

  const getSelectedIndex = () => {
    if (pathname.includes("/exam")) return 1;
    if (pathname.includes("/members")) return 2;
    return 0;
  };

  const selectedIndex = getSelectedIndex();

  return {selectedIndex, exams, getExams, members}
}