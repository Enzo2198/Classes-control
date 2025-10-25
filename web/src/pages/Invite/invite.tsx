// import {type FormEvent, useEffect, useState} from "react";
// import {useNavigate, useSearchParams, type NavigateFunction } from "react-router";
// import {getMethod, type Member, postMethod} from "../../utils";
// import { toast } from "react-toastify";
//
//
// export function useInvite() {
//   const navigate: NavigateFunction = useNavigate();
//   const [searchParams] = useSearchParams();
//   const classId = searchParams.get("class");
//   // const { user } = useUser();
//
//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//
//   const [isInClass, setIsInClass] = useState(false);
//   const [classData, setClassData] = useState({
//     name: "",
//     code: "",
//     teachers: [] as Member[],
//     students: [] as Member[],
//   });
//
//   const [inputCode, setInputCode] = useState("");
//
//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//
//     const payload = {
//       class_id: classId,
//       user_id: Number(user.id),
//       code: inputCode,
//     };
//
//     const response = await postMethod("/invitations", payload, {
//       headers: {
//         Authorization: `Bearer ${await getValidAccessToken()}`,
//       },
//     });
//
//     if (!response) {
//       toast.error("Có lỗi, vui lòng thử lại !");
//     } else {
//       toast.success("Tham gia thành công!");
//       navigate(`/class/${classId}`);
//     }
//   };
//
//   useEffect(() => {
//     const onMounted = async () => {
//       const accessToken = await getValidAccessToken();
//       setIsAuthenticated(!!accessToken);
//       setIsCheckingAuth(false);
//
//       if (!accessToken) {
//         localStorage.setItem("redirectAfterLogin", window.location.href);
//         navigate("/login");
//         return;
//       }
//
//       if (accessToken && classId) {
//         const { name, code, teachers, students } = await getMethod(`/classes/${classId}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//
//         setClassData({ name, code, teachers, students });
//
//         // check user have been in class yet
//         setIsInClass(
//           teachers.some((u: Member) => u.id === Number(user.id)) ||
//           students.some((u: Member) => u.id === Number(user.id))
//         );
//       }
//     };
//
//     onMounted();
//   }, [classId, user.id, navigate]);
//
//   return {
//     navigate,
//     classId,
//     isCheckingAuth,
//     isAuthenticated,
//     isInClass,
//     classData,
//     inputCode,
//     setInputCode,
//     onSubmit,
//   };
// }
