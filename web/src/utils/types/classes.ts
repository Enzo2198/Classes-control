import type {ReactNode} from "react";
import type {Course, Member, Test} from "./common.ts";
import type {ExamGroup} from "./exams.ts";

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

export interface NewClassForm {
  name: string;
  code: string;
}

export interface OverviewContentProps {
  course: Course
  examGroups: ExamGroup[]
}