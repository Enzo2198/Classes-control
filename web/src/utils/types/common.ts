export interface Course {
  id: string;
  name: string;
  memberCount: number;
  classCode: string;
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