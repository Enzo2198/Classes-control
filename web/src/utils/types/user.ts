import type {Member} from "./common.ts";

export interface User extends Member{
  email: string,
  createdAt: string,
  updatedAt: string,
  isDeleted: boolean,
  profile: UserProfile
}

export interface UserProfile {
  id: string | null,
  url?: string,
}

export interface UserAuth {
  accessToken: string,
  refreshToken: string,
}