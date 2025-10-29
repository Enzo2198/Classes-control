import {AvatarInfo, Role} from "@/share";

export interface UserBaseI {
  name: string;
  email: string;
  status?: string;
}

export interface UserI extends UserBaseI {
  id: number;
  role: Role
  avatar: number | null;
}

export interface UserReqI extends UserBaseI {}

export interface UserResI extends Omit<UserI, 'avatar'> {
  avatar_info: AvatarInfo | null;
}

export interface LoginReqI {
  email: string;
  password: string;
}

export interface UserWithPassI extends UserResI {
  password: string;

}

export interface LoginResI {
  accessToken: string;
  refreshToken: string;
}

export interface ChangePasswordReqI {
  old_password: string;
  new_password: string;
}

export interface RegisterReqI extends UserReqI {
  password: string;
  role: Role;
}