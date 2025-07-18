import {useEffect, useMemo, useState} from "react";
import { Box, Button, Checkbox, Stack, Typography, Paper, Link } from "@mui/material";
import {NavLink, useNavigate} from "react-router";
import { FloatingInput } from "../../components";
import {postMethod} from "../../utils";
import {isLogin} from "./common.tsx";
import type {FormData, FormErrors, LoginResponse} from "../../utils"

export default function Login() {
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

  const validateEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
        password: value.length >= 8 ? "" : "Mật khẩu tối thiểu 8 ký tự."
      }));
    }
  };

  const handleLogin = async () => {
    let isValid: boolean = true
    const newErrors = { ...errors };

    // Check value conditions
    if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ"
      isValid = false
    }
    if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu tối thiểu 8 ký tự";
      isValid = false;
    }

    setErrors(newErrors)
    if (!isValid) return

    setIsLoading(true)
    try {
      // Call API
      const response = await postMethod<LoginResponse>('login', {
        email: formData.email,
        password: formData.password
      })
      if (!response) throw new Error('Connect server failed')

      // Save local storage
      if (response?.access && response?.refresh) {
        localStorage.setItem('access', response.access)
        localStorage.setItem('refresh', response.refresh)

        navigate('/classes')
      } else {
        throw new Error('Lỗi đăng nhập')
      }

    } catch (e) {
      console.error(e)
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

  return (
    <Box
      sx={{
        background: "#f8f9fb",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper
        sx={{
          width: 900,
          height: 550,
          borderRadius: "12px",
          boxShadow: 3,
          display: "flex",
          position: "relative",
        }}
      >
        {/* Left side - Blue section */}
        <Box
          sx={{
            flex: 1,
            background: "#1976d2",
            color: "white",
            display: "flex",
            flexDirection: 'column',
            justifyContent: "flex-end",
            px: 8,
            py: 6,
            width: "50%",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              mb: 1,
              fontSize: "1.5rem",
              lineHeight: 1.2,
            }}
          >
            GIEO MẦM SÁNG TẠO...
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              textAlign: "right",
              fontSize: "1.5rem",
              lineHeight: 1.2,
            }}
          >
            ... DẪN HƯỚNG ĐAM MÊ
          </Typography>
        </Box>

        {/* Right side - Form section */}
        <Box
          sx={{
            flex: 1,
            px: 8,
            py: 6,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Stack spacing={2} mb={3}>
            {/* Logo */}
            <Box textAlign="center">
              <Typography variant="h3" fontWeight="bold"
                sx={{
                  fontSize: "2.5rem",
                  letterSpacing: "1px"
                }}
              >
                <Box component="span" sx={{mr: 1}}>
                  <img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png" alt="logo" width="40" height="40"/>
                </Box>
                <Typography component="span" color="primary.main"
                  sx={{
                    pr: "5px",
                    fontSize: "inherit",
                  }}
                >
                  BK
                </Typography>
                <Typography component="span" color="#ff9800"
                  sx={{
                    fontSize: "inherit",
                  }}
                >
                  Star
                </Typography>
              </Typography>
            </Box>

            {/* Title */}
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              sx={{
                color: "black",
                fontSize: "1.75rem",
                mt: 2,
              }}
            >
              Đăng Nhập
            </Typography>

            {/* Subtitle */}
            <Box textAlign="center" mb={4}>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                Cung cấp giải pháp toàn diện cho
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                lớp học thông minh
              </Typography>
            </Box>

            {/* Form inputs */}
            <FloatingInput
              label="Nhập địa chỉ email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <FloatingInput
              label="Nhập mật khẩu"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            {/* Remember me checkbox */}
            <Box display="flex" alignItems="center" mt={1} mb={3}>
              <Checkbox
                sx={{
                  padding: "8px",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  fontSize: "0.9rem",
                  ml: 1,
                }}
              >
                Ghi nhớ đăng nhập
              </Typography>
            </Box>

            {/* Login button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleLogin}
              sx={{
                height: "48px",
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                borderRadius: "4px",
                '&:hover': {
                  background: '#1565c0'
                }
              }}
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? 'Đang đăng nhập' : 'Đăng nhập'}
            </Button>
          </Stack>

          {/* Sign up link */}
          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              color: "#666",
              mt: "auto",
              fontSize: "0.9rem",
            }}
          >
            <Link
              component={NavLink}
              to="/register"
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "none",
                '&:hover': {
                  textDecoration: "underline"
                }
              }}
            >
              Đăng kí
            </Link>{' '}
            tài khoản cho học viên
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}