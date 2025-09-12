import type { User, UserAuth } from "../utils/types/user.ts";
import { create } from "zustand";
import {persist} from "zustand/middleware";

export interface UserState {
  auth: UserAuth
  user: User
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
      setAuth: (auth) => set({ auth }),
      setUser: (user) => set({ user: { ...state().user, ...user } }),
      clear: () => set({ ...defaultUserState }),
    }),
    {
      name: "user", // name of the item in the storage (must be unique)
      partialize: (state) => Object.fromEntries(
        Object.entries(state).filter(([key]) => ['auth'].includes(key))
      )
    }
  )
)