export interface Course {
  id: string;
  name: string;
  memberCount: number;
  code: string;
  themeColor?: string;
}

export interface Member {
  id: number;
  name: string;
  role: string;
}

export interface Test {
  id: number;
  name: string;
  date: string;
}

export interface FormData {
  email: string;
  password: string;
}

export interface FormErrors extends FormData {
  form?: string;
}


export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface ClassroomContextType {
  teacherName: string,
  className: string,
  members: Member[] | any[],
  tests: Test[] | any[]
}