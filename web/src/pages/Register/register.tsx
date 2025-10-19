import {useState} from "react";
import { useNavigate } from "react-router";
import {validateConfirmPassword, validateEmail, validateName, validatePassword} from "../../components";
import { postMethod } from "../../utils";
import { toast } from "react-toastify";
import * as React from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface FormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function useRegister() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()

  const validateRegisterForm = (data: FormData): Partial<FormErrors> => {
    const errors: Partial<FormErrors> = {};

    if (!validateName(data.name)) errors.name = "Vui lòng nhập tên.";
    if (!validateEmail(data.email)) errors.email = "Email không hợp lệ.";
    if (!validatePassword(data.password)) errors.password = "Mật khẩu tối thiểu 8 ký tự.";
    if (!validateConfirmPassword(data.password, data.confirmPassword))
      errors.confirmPassword = "Mật khẩu không khớp.";

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Validate sau khi cập nhật
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name as keyof FormErrors]: validateRegisterForm(updatedForm)[name as keyof FormErrors] ?? "",
      }));

      return updatedForm;
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldErrors = validateRegisterForm(formData);
    setErrors((prev) => ({
      ...prev,
      [name as keyof FormErrors]: fieldErrors[name as keyof FormErrors] ?? "",
    }));
  };

  const handleSubmit = async () => {
    // validate toàn bộ form
    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors as FormErrors);
      return;
    }

    try {
      const response = await postMethod("/auth/register", {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: "confirming",
        password: formData.password,
      });

      if (response) {
        toast.success("Đăng ký thành công!");
        navigate("/login");
      } else {
        toast.error("Đăng ký thất bại!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };


  return {
    formData,
    errors,
    touched,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleChange,
    handleBlur,
    handleSubmit
  }
}