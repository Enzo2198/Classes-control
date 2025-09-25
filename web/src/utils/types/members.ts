import type {Member} from "./common.ts";

export interface MembersContentProps {
  members: Member[]
}

export interface HeaderMember {
  name: string
  text: string
}