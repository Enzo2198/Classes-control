import {AvatarInfo, Role} from "@/share";

export interface UserBaseI {
  name: string;
  email?: string;
}

export interface UserI extends UserBaseI {
  id: number;
  // role: Role;
}

export interface UserReqI extends UserBaseI {
  password: string;
}

export interface UserResI extends UserI {
  avatar: AvatarInfo;
}