import {type FormEvent, useState} from "react";
import {useNavigate} from "react-router";
import {getValidAccessToken, postMethod} from "../../utils";
import {toast} from "react-toastify";
import SimpleAuthForm from "./SimpleAuthForm.tsx";
import {validatePassword} from "../../components";

export default function ForgotPasswordStep2() {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !code) {
      return toast.error("Vui lòng không để trống");
    } else if (!validatePassword(newPassword, 8)) {
      toast.error('Vui lòng nhập tối thiểu 8 ký tự')
    } else if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp')
      return
    }

    const payload = {
      code: code,
      newPassword: newPassword
    };
    try {
      setLoading(true);
      const response = await postMethod("/auth/reset-password", payload, {
        headers: {
          Authorization: `Bearer ${await getValidAccessToken()}`,
        },
      });
      if (!response) {
        toast.error("Mã code không chính xác!");
      } else {
        toast.success("Đổi mật khẩu thành công!");
        navigate(`/login`);
      }
    } catch (error) {
      console.error('đã có lỗi xảy ra:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SimpleAuthForm
      title="Đặt lại mật khẩu"
      buttonText="Đổi mật khẩu"
      noteText={"Mã code đã được gửi tới email của bạn có thời hạn 15 phút"}
      disabled={loading}
      fields={[
        {
          name: "code",
          placeholder: "Nhập code của bạn",
          value: code,
          onChange: (e) => setCode(e.target.value),
          autoComplete: "off"
        },
        {
          name: "newPassword",
          placeholder: "Nhập mật khẩu mới",
          type: "password",
          value: newPassword,
          onChange: (e) => setNewPassword(e.target.value),
          autoComplete: "new-password"
        },
        {
          name: "confirmPassword",
          placeholder: "Nhập lại mật khẩu",
          type: "password",
          value: confirmPassword,
          onChange: (e) => setConfirmPassword(e.target.value),
          autoComplete: "confirm-password"
        }
      ]}
      onSubmit={handleSubmit}
    />
  )
}

