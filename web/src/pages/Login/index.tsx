import {Box, Button, Checkbox, Stack, Typography, Paper, Link, TextField, InputAdornment, IconButton} from "@mui/material";
import {NavLink} from "react-router";
import {useLogin} from "./login.ts";
import {LogoElement} from "../../components";
import {Visibility, VisibilityOff } from "@mui/icons-material";

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
    isLoading,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleMouseUpPassword
  } = useLogin();

  return (
    <Box
      sx={{
        background: "#f8f9fb",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url('/Background-Image.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
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
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: "12px",
            borderBottomLeftRadius: "12px",
            px: 4,
            py: 4,
            width: "50%",
          }}
        >
          <Box
            component="img"
            src="/Login-Image.jpg"
            alt="login-image"
            sx={{
              width: "100%",
              height: "auto",
              mt: 12,
            }}
          />
          <Box>
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
            <Box
              textAlign="center"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Typography
                variant="h3" fontWeight="bold"
                sx={{
                  fontSize: "2.5rem",
                  letterSpacing: "1px",
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LogoElement width={60} height={60}/>
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
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(helperTexts.password)}
              helperText={touched.password && helperTexts.password}

              slotProps={{
                input: {
                  endAdornment:
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                }
              }}
            />

            {/* Remember me checkbox */}
            <Box display="flex" alignItems="center" justifyContent={'space-between'} mt={1} mb={3}>
              <Box display='flex' alignItems="center">
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
                  }}
                >
                  Ghi nhớ đăng nhập
                </Typography>
              </Box>

              <Link
                component={NavLink}
                to="/forgot-password"
                sx={{
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  textDecoration: "none",
                  '&:hover': {
                    textDecoration: "underline"
                  }
                }}
              >
                Quên mật khẩu?
              </Link>
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