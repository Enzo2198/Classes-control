import { useState } from "react";
import {Box, Button, Typography, Paper, Link, Stack, FormControl, FormLabel, TextField, IconButton, InputAdornment} from "@mui/material";
import { NavLink } from "react-router";
import {LuEye, LuEyeOff} from "react-icons/lu";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const validateEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newFormData = { ...formData, [name]: value };
    const newErrors = { ...errors };

    if (name === "name") {
      newErrors.name = value ? "" : "Vui lòng nhập tên.";
    }

    if (name === "email") {
      newErrors.email = validateEmail(value) ? "" : "Email không hợp lệ.";
    }

    if (name === "password") {
      newErrors.password = value.length >= 6 ? "" : "Mật khẩu tối thiểu 6 ký tự.";
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
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });

    // Validate field when blur
    if (name === "name" && !formData.name) {
      setErrors({ ...errors, name: "Vui lòng nhập tên." });
    }
  };

  return (
    <Box
      sx={{
        background: "#f8f9fb",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: 500,
          background: "white",
          p: 8,
          borderRadius: "12px",
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography component="span" variant="h3" fontWeight="bold" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box component="span" sx={{ mr: 2 }}>
              <img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png" alt="logo" width="40" height="40" />
            </Box>
            <Typography component="span" color="primary.main" pr="6px" fontSize={'inherit'}>
              BK
            </Typography>
            <Typography component="span" color="warning.main" fontSize={'inherit'}>
              STAR
            </Typography>
          </Typography>
          <Typography variant="h5" fontWeight="bold" mt={2} color="text.primary">
            Đăng kí học viên
          </Typography>
        </Box>

        <Stack spacing={3} width="100%">
          <FormControl>
            <FormLabel sx={{ fontWeight: "bold", fontSize: "16px", color: "black" }}>
              Tên của bạn
            </FormLabel>
            <TextField
              label="Nhập tên của bạn *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.name && (touched.name || !!formData.name)}
              helperText={(touched.name || !!formData.name) ? errors.name : ""}
              sx={{ mt: 2 }}
            />
          </FormControl>

          <FormControl>
            <FormLabel sx={{ fontWeight: "bold", fontSize: "16px", color: "black" }}>
              Địa chỉ email
            </FormLabel>
            <TextField
              label="Nhập địa chỉ email *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mt: 2 }}
            />
          </FormControl>

          <FormControl>
            <FormLabel sx={{ fontWeight: "bold", fontSize: "16px", color: "black" }}>
              Mật khẩu
            </FormLabel>
            <TextField
              label="Nhập mật khẩu *"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mt: 2 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <LuEyeOff /> : <LuEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel sx={{ fontWeight: "bold", fontSize: "16px", color: "black" }}>
              Nhập lại mật khẩu
            </FormLabel>
            <TextField
              label="Nhập lại mật khẩu *"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{ mt: 2 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
            />
          </FormControl>

          <Stack direction="row" justifyContent="center" spacing={6} pt={4}>
            <Link component={NavLink} to="/login" underline="none">
              <Button
                variant="outlined"
                sx={{
                  color: "primary.main",
                  borderColor: "primary.main",
                  fontWeight: "bold",
                  width: "100px",
                  height: "40px",
                  borderRadius: "4px",
                  '&:hover': {
                    background: "primary.light",
                    borderColor: "primary.main",
                  }
                }}
              >
                Hủy
              </Button>
            </Link>

            <Button
              variant="contained"
              sx={{
                background: "primary.main",
                color: "white",
                fontWeight: "bold",
                width: "100px",
                height: "40px",
                borderRadius: "4px",
                '&:hover': {
                  background: "primary.dark",
                }
              }}
            >
              Đăng ký
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}