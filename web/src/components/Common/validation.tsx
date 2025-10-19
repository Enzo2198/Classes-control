export const validateEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export const validatePassword= (password: string, minLength = 8) =>
  password.length >= minLength

export const validateConfirmPassword = (newPass: string, confirm: string) =>
  newPass === confirm;

export const validateName = (name: string) => name.trim().length > 0;

