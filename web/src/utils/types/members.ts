import type {Course} from "./common.ts";

export interface MembersContentProps {
  course: Course
}

export interface HeaderMember {
  name: string
  text: string
}