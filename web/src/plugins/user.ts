import type {User, UserAuth,} from "../utils";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {decodeToken} from "../utils/jwt.ts";

export interface UserState {
  auth: UserAuth
  user: User
  setAuth: (auth: UserAuth) => void
  setUser(user: Partial<User>): void
  clear(): void
}

const defaultUserState: { auth: UserAuth, user: User } = {
  auth: {accessToken: '', refreshToken: ''},
  user: {
    id: null,
    name: "",
    role: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    isDeleted: false,
    profile: {
      id: null,
      url: ""
    }
  },
}

export const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      ...defaultUserState,

      setAuth: (auth) => {
        const decoded = decodeToken(auth.accessToken);

        if (decoded) {
          set({
            auth,
            user: {
              ...get().user,
              id: decoded.sub ?? "",
              role: decoded.role ?? "",
              email: decoded.email ?? get().user.email,
            },
          });
        } else {
          set({ auth });
        }
      },

      setUser: (user) => set({ user: { ...get().user, ...user } }),

      clear: () => set({ ...defaultUserState }),
    }),
    {
      name: "user",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ["auth"].includes(key))
        ),
    }
  )
);