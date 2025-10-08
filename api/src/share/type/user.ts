import {AvatarInfo, Role} from "@/share";

export interface UserBaseI {
  name: string;
  email?: string;
}

export interface UserI extends UserBaseI {
  id: number;
  role: Role
}

export interface UserReqI extends UserBaseI {
  password: string;
}

export interface UserResI extends UserI {
  avatar: AvatarInfo;
}

export interface LoginReqI {
  email: string;
  password: string;
}

export interface LoginResI {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayloadData {
  name: string;
  email: string;
  role: Role;
  avatar_info: AvatarInfo | null;
}

export interface ChangePasswordReqI {
  old_password: string;
  new_password: string;
}