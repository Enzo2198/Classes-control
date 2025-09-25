import type {ReactNode} from "react";
import type {Member, Test} from "./common.ts";

export interface ClassroomLayoutProps {
  className: string;
  children?: ReactNode;
}

export interface ClassroomOutletContext {
  className: string;
  members: Member[];
  loading: boolean;
  error: string | null;
}

export interface Classroom {
  id: number;
  code: string;
  name: string;
  users: Member[];
}

export interface ClassroomContextType {
  classInfo: Classroom | null,
  members: Member[],
  exams: Test[]
}