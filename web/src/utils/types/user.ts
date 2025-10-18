import type {Member} from "./common.ts";

export interface User extends Member{
  createdAt: string,
  updatedAt: string,
  isDeleted: boolean,
  profile: UserProfile
}

export interface UserProfile {
  id: number | null,
  url?: string,
}

export interface UserAuth {
  accessToken: string,
  refreshToken: string,
}