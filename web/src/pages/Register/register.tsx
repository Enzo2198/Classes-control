import {useState} from "react";
import { useNavigate } from "react-router";
import { validateEmail, validatePassword } from "../../components";
import { postMethod } from "../../utils";
import { toast } from "react-toastify";

export function useRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    const newFormData = {...formData, [name]: value};
    const newErrors = {...errors};

    if (name === "name") {
      newErrors.name = value ? "" : "Vui lòng nhập tên.";
    }

    if (name === "email") {
      newErrors.email = validateEmail(value) ? "" : "Email không hợp lệ.";
    }

    if (name === "password") {
      newErrors.password = validatePassword(value) ? "" : "Mật khẩu tối thiểu 8 ký tự.";
      newErrors.confirmPassword =
        newFormData.confirmPassword === value ? "" : "Mật khẩu không khớp.";
    }

    if (name === "confirmPassword") {
      newErrors.confirmPassword =
        value === newFormData.password ? "" : "Mật khẩu không khớp.";
    }

    setFormData(newFormData);
    setErrors(newErrors);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const {name} = e.target;
    setTouched({...touched, [name]: true});

    // Validate field when blur
    if (name === "name" && !formData.name) {
      setErrors({...errors, name: "Vui lòng nhập tên."});
    }
  };

  const CreateUser = async () => {
    try {
      const response = await postMethod('/master/user/', {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: "confirming",
        password: formData.password,
      })

      if(response) {
        toast.success('Đăng ký thành công')
      } else {
        toast.error('Đăng ký thất bại')
      }

      navigate('/login')
    } catch (e) {
      console.error(e)
    }
  }

  return { formData, errors, touched, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, handleChange, handleBlur, CreateUser }
}