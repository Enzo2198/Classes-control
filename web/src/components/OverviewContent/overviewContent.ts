import type {Course, Member} from "../../utils";
import {toast} from "react-toastify";
import {Paper, styled} from "@mui/material";

export default function useOverviewContent({course}: {course: Course}) {
  const teachers: Member[] = course.teachers;
  const students: Member[] = course.students;
  const teachersName: string = teachers.map(teacher => teacher.name).join(", ");
  const newUsers: Member[] = [...teachers, ...students];

  /*********** share invite link *************/
  const baseUrl: string = window.location.origin;
  const linkToInvite = `${baseUrl}/invite?class=${course.id}`
  const onCopyLink = () => {
    navigator.clipboard.writeText(linkToInvite).then(() => {
      toast.info('Đã sao chép link lớp học!')
    }).catch((err) => {
      toast.error('Sao chép thất bại!');
      console.error('Failed to copy link to clipboard:', err)
    });
  }

  const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return {teachersName, newUsers, onCopyLink, Item}
}