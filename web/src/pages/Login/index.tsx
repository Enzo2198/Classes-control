import { Box, Button, Checkbox, Stack, Typography, Paper, Link, TextField } from "@mui/material";
import { NavLink } from "react-router";
// import { FloatingInput } from "../../components";
import { useLogin } from "./login.ts";

export default function Login() {
  const {
    formData,
    helperTexts,
    handleChange,
    handleBlur,
    handleSubmit,
    setRememberMe,
    rememberMe,
    touched,
    isLoading
  } = useLogin();

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
          component="form"
          onSubmit={handleSubmit}
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
            <Box textAlign="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h3" fontWeight="bold"
                          sx={{
                            fontSize: "2.5rem",
                            letterSpacing: "1px",
                            display: 'flex',
                            alignItems: 'center',
                          }}
              >
                <Box component="span" sx={{mr: 1}}>
                  <img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png" alt="logo" width="40" height="40" style={{ display: 'block' }}/>
                </Box>
                <Typography component="span" color="primary.main"
                  sx={{
                    pr: "5px",
                    fontSize: "50px",
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  BK
                </Typography>
                <Typography component="span" color="#ff9800"
                  sx={{
                    fontSize: "50px",
                    fontWeight: 600,
                    lineHeight: 1,
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
                variant="body1"
                sx={{
                  color: "#666",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                }}
              >
                Cung cấp giải pháp toàn diện cho
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  fontSize: "1rem",
                }}
              >
                lớp học thông minh
              </Typography>
            </Box>

            {/* Form inputs */}
            <TextField
              label="Nhập địa chỉ email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(helperTexts.email)}
              helperText={touched.email && helperTexts.email}
            />

            <TextField
              label="Nhập mật khẩu"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(helperTexts.password)}
              helperText={touched.password && helperTexts.password}
            />

            {/* Remember me checkbox */}
            <Box display="flex" alignItems="center" mt={1} mb={3}>
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
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
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                height: "48px",
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                borderRadius: "4px",
                '&:hover': {
                  background: '#1565c0'
                },
                '&:disabled': {
                  backgroundColor: '#e0e0e0',
                  color: '#9e9e9e'
                }
              }}
              disabled={isLoading}
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