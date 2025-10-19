export const validateEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export const validatePassword= (password: string, minLength = 8) =>
  password.length >= minLength

export const validateConfirmPassword = (newPass: string, confirm: string) =>
  newPass === confirm;

export const validateName = (name: string) => name.trim().length > 0;

export function validateRegisterForm(formData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const errors: Record<string, string> = {};

  if (!validateName(formData.name)) {
    errors.name = "Vui lòng nhập tên.";
  }

  if (!validateEmail(formData.email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (!validatePassword(formData.password)) {
    errors.password = "Mật khẩu tối thiểu 8 ký tự.";
  }

  if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
    errors.confirmPassword = "Mật khẩu không khớp.";
  }

  return errors;
}
