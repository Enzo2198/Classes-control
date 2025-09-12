export interface User {
  id: string,
  name: string,
  email: string,
  role: string,
  createdAt: string,
  updatedAt: string,
  isDeleted: boolean,
  profile: UserProfile
}

export interface UserProfile {
  id: string,
  url: string,
}

export interface UserAuth {
  accessToken: string,
  refreshToken: string,
}