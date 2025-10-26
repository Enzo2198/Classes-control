import {useState} from "react";
import {validateEmail, validatePassword} from "../../components";
import {type FormErrors, getUserInfo, type LoginForm, postMethod} from "../../utils"
import {toast} from "react-toastify";
import * as React from "react";
import {useNavigate} from "react-router";
import {setCookie} from "../../stores";

export function useLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [helperTexts, setHelperTexts] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })

  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  /************** Validate field **************/
  const validateField = (name: keyof LoginForm, value: string) => {
    let error = ""

    switch (name) {
      case "email":
        if (!value) {
          error = "Vui lòng nhập email"
        }
        else if (!validateEmail(value)) error = "Địa chỉ email không hợp lệ"
        break;

      case "password":
        if (!value) error = "Vui lòng nhập mật khẩu"
        else if (!validatePassword(value, 8)) error = "Vui lòng nhập tối thiểu 8 ký tự"
        break;
    }

    setHelperTexts(prev => ({ ...prev, [name]: error }));
    return !error;
  }

  /************** Event handlers **************/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}))

    // validate realtime if user touched field
    if (touched[name as keyof LoginForm]) validateField(name as keyof LoginForm, value)
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTouched(prev => ({...prev, [name]: true}))
    validateField(name as keyof LoginForm, value)
  }

  /************** Login **************/
  const login = async () => {
    const response = await postMethod("/auth/login", formData)

    if (!response) {
      toast.error("Sai email hoặc mật khẩu")
      return;
    }

    toast.success("Đăng nhập thành công!")
    const { accessToken, refreshToken } = response

    // Save Token
    const now = Math.floor(Date.now() / 1000)
    const { exp } = getUserInfo(accessToken)
    const maxAge = exp - now
    setCookie("accessToken", accessToken, maxAge)

    if (rememberMe) {
      const refreshMaxAge = 7 * 24 * 60 * 60 * 1000 // 7 days
      const expiresAt = now + refreshMaxAge
      localStorage.setItem("refreshTokenExpiresAt", expiresAt.toString())
      setCookie("refreshToken", refreshToken, refreshMaxAge / 1000)
      localStorage.setItem("rememberMe", "true")
    } else {
      setCookie("refreshToken", refreshToken)
      localStorage.removeItem("rememberMe")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValid = validateField("email", formData.email)
    const passwordValid = validateField("password", formData.password)
    if (!emailValid || !passwordValid) return

    setIsLoading(true)
    await login()

    const redirectUrl = localStorage.getItem("redirectAfterLogin")
    if (redirectUrl) {
      localStorage.removeItem("redirectAfterLogin")
      window.location.href = redirectUrl
    } else {
      setIsLoading(false)
      navigate("/classes")
    }
  }


  return {
    formData,
    helperTexts,
    handleChange,
    handleBlur,
    handleSubmit,
    setRememberMe,
    rememberMe,
    touched,
    isLoading,
  }
}