import {type FormEvent, useState} from "react";
import {getValidAccessToken, postMethod} from "../../utils";
import {toast} from "react-toastify";
import { useNavigate } from "react-router";
import SimpleAuthForm from "./SimpleAuthForm.tsx";
import {validateEmail} from "../../components";

export default function ForgotPasswordStep1() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = await getValidAccessToken();

    if (!email) {
      return toast.error('Vui lòng nhập email')
    } else if (!validateEmail(email)) return toast.error('Email không hợp lệ')

    try {
      setLoading(true);
      const response = await postMethod("/auth/forgot-password", {email}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response) {
        toast.error('Email này chưa được đăng ký');
        return setLoading(false);
      }
      toast.success("Đã gửi mã xác nhận đến email!");
      setEmail('')
      navigate("/verify-newPassword");
    } catch (error: any) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SimpleAuthForm
      title="Xác nhận Email"
      buttonText="Lấy mã xác nhận"
      disabled={loading}
      fields={[
        {
          name: "email",
          placeholder: "Nhập email của bạn",
          type: "email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
        }
      ]}
      onSubmit={handleSubmit}
    />
  )
}