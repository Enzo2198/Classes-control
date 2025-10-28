export interface Course {
  id: number;
  name: string;
  code: string;
  teachers: Member[];
  students: Member[];
}

export interface Member {
  id: number;
  name: string;
  role: string;
  email: string;
}

export interface Test {
  id: string;
  name: string;
  start_time: string;
}

export interface FormData {
  email: string;
  password: string;
}

export interface FormErrors extends FormData {
  form?: string;
}

export interface LoginForm extends FormData {}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

