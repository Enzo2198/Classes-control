import type { User, UserAuth } from "../utils/types/user.ts";
import { create } from "zustand";
import {persist} from "zustand/middleware";
import {decodeToken} from "../utils/jwt.ts";

export interface UserState {
  auth: UserAuth
  user: User | null
  setAuth: (auth: UserAuth) => void
  setUser(user: Partial<User>): void
  clear(): void
}

const defaultUserState: { auth: UserAuth, user: User } = {
  auth: { accessToken: '', refreshToken: '' },
  user: {
    id: '',
    name: '',
    email: '',
    role: '',
    createdAt: '',
    updatedAt: '',
    isDeleted: false,
    profile: {
      id: '',
      url: '',
    }
  }
}

export const useUser = create<UserState>()(
  persist(
    (set, state) => ({
      ...defaultUserState,
      setAuth: (auth) => {
        const payload = decodeToken(auth.accessToken)
        set({
          auth,
          user: payload ? {
            ...defaultUserState.user,
            id: payload.id,
            name: payload.name ?? '',
            role: payload.role ?? '',
            profile: payload.profile ?? {id: '', url: ''},
          } : null,
        })
      },
      setUser: (user) => set({
        user: {
          ...defaultUserState.user,
          ...state().user,
          ...user
        }
      }),
      clear: () => set({ ...defaultUserState }),
    }),
    {
      name: "user",
    }
  )
)