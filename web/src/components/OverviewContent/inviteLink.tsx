import {toast} from "react-toastify";
import {useOutletContext} from "react-router";
import type {ClassroomContextType} from "../../utils";

export function useInviteLink() {
  const {classInfo} = useOutletContext<ClassroomContextType>();

  const baseUrl: string = window.location.origin;
  const linkToInvite =classInfo?.id ? `${baseUrl}/class/${classInfo.id}` : ''
  const onCopyLink = async () => {
    if (!linkToInvite) {
      toast.error("Không tìm thấy lớp học");
      return;
    }
    try {
      await navigator.clipboard.writeText(linkToInvite)
      toast.info('Đã sao chép link lớp học')
    } catch (error) {
      toast.error('Sao chép thất bại')
      console.error(error)
    }
  };
  return {onCopyLink};
}