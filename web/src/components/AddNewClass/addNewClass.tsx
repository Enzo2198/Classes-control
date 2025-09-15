import {useState} from "react";
import {postMethod} from "../../utils";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import {useUser} from "../../plugins/user.ts";

export function useAddNewClass() {
  const [className, setClassName] = useState("")
  const [classCode, setClassCode] = useState("")
  const navigate = useNavigate();
  const {user} = useUser();

  const toCreateClass = async () => {
    try {
      const response = await postMethod('/master/class/', {
        name: className,
        code: classCode,
        users: [user?.id],
      })
      if (!response) {
        console.error('Connect server failed')
        toast.error('Tạo lớp thất bại')
      }

      toast.success('Tạo lớp thành công')
      navigate('/classes')
    } catch (e) {
      console.error(e)
    }
  };

  return { className, setClassName, classCode, setClassCode, toCreateClass };
}