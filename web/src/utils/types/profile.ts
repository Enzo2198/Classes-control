import type {UserProfile} from "./user.ts";

export interface InfoForm {
  name: string,
  email: string,
  avatar_info: UserProfile | null
}

export interface PasswordForm {
  old_password: string,
  new_password: string,
  confirm_new_password: string
}