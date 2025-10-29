import {type FormEvent, useEffect, useState} from "react";
import {useNavigate, useSearchParams, type NavigateFunction } from "react-router";
import {getMethod, getUserInfo, getValidAccessToken, type Member, postMethod} from "../../utils";
import { toast } from "react-toastify";


export function useInvite() {
  const navigate: NavigateFunction = useNavigate();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("class");

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isInClass, setIsInClass] = useState(false);
  const [userId, setUserId] = useState(0);

  const [inputCode, setInputCode] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      class_id: Number(classId),
      user_id: userId,
      code: inputCode,
    };

    const response = await postMethod("/invitation", payload, {
      headers: {
        Authorization: `Bearer ${await getValidAccessToken()}`,
      },
    });

    if (!response) {
      toast.error("Có lỗi, vui lòng thử lại !");
    } else {
      toast.success("Tham gia thành công!");
      navigate(`/class/${classId}`);
    }
  };

  useEffect(() => {
    const onMounted = async () => {
      const accessToken = await getValidAccessToken();
      setIsAuthenticated(!!accessToken);
      setIsCheckingAuth(false);

      if (!accessToken) {
        localStorage.setItem("redirectAfterLogin", window.location.href);
        return;
      }

      if (accessToken && classId) {
        const {sub} = getUserInfo(accessToken);
        const userId = Number(sub);
        setUserId(userId);

        const response = await getMethod(`/classes/${classId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if(!response) return;
        const {teachers, students} = response;

        // check if the user is already in the class
        setIsInClass(
          teachers.some((user: Member) => user.id === userId)
          || students.some((user: Member) => user.id === userId)
        );
      }
    };

    onMounted();
  }, [classId, navigate]);

  return {
    navigate,
    classId,
    isCheckingAuth,
    isAuthenticated,
    isInClass,
    inputCode,
    setInputCode,
    onSubmit,
  };
}
