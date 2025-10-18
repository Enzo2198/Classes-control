import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router";
import {validateEmail, validatePassword} from "../../components";
import {postMethod} from "../../utils";
import {isLogin} from "./common.tsx";
import type {FormData, FormErrors, LoginResponse} from "../../utils"
import {toast} from "react-toastify";
import {useUser} from "../../plugins/user.ts";
import * as React from "react";

export function useLogin() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Handle changes on input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(e => ({...e, [name]: value}))

    if (name === "email") {
      setErrors(e => ({
        ...e,
        email: validateEmail(value) ? "" : "Email không hợp lệ"
      }));
    }

    if (name === "password") {
      setErrors(e => ({
        ...e,
        password: validatePassword(value) ? "" : "Mật khẩu tối thiểu 8 ký tự."
      }));
    }
  };

  const handleLogin = async () => {
    let isValid: boolean = true
    const newErrors = {...errors};

    // Check value conditions
    if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ"
      isValid = false
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "Mật khẩu tối thiểu 8 ký tự";
      isValid = false;
    }

    setErrors(newErrors)
    if (!isValid) return

    setIsLoading(true)
    try {
      // Call API
      const response = await postMethod<LoginResponse>('/auth/login', {
        email: formData.email,
        password: formData.password
      })
      if (!response) {
        toast.error('Email hoặc mật khẩu chưa chính xác')
        return
      }

      // Save storage
      useUser.getState().setAuth({
        accessToken: response.access,
        refreshToken: response.refresh
      })

      navigate('/classes')

    } catch (e) {
      console.error(e)
      toast.error('Có lỗi xảy ra vui lòng thử lại!')
    } finally {
      setIsLoading(false)
    }
  };

  const isFormValid = useMemo(() => {
    return (
      validateEmail(formData.email) &&
      formData.password.length >= 8 &&
      !errors.email &&
      !errors.password
    )
  }, [formData, errors])

  useEffect(() => {
    if (isLogin()) {
      navigate('/classes')
    }
  }, [navigate])

  return {formData, errors, isLoading, isFormValid, handleChange, handleLogin}
}