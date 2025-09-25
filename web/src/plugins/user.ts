import type {User, UserAuth} from "../utils";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {decodeToken} from "../utils/jwt.ts";

export interface UserState {
  auth: UserAuth
  user: User | null
  setAuth: (auth: UserAuth) => void

  setUser(user: Partial<User>): void

  clear(): void
}

const defaultUserState: { auth: UserAuth, user: User | null } = {
  auth: {accessToken: '', refreshToken: ''},
  user: null
}

export const useUser = create<UserState>()(
  persist(
    (set, state) => ({
      ...defaultUserState,
      setAuth: (auth) => {
        const payload = decodeToken(auth.accessToken)

        if (payload) {
          set({
            auth,
            user: {
              id: payload.id,
              name: payload.name ?? '',
              email: payload.email ?? '',
              role: payload.role ?? '',
              createdAt: payload.createdAt ?? '',
              updatedAt: payload.updatedAt ?? '',
              isDeleted: payload.isDeleted ?? false,
              profile: payload.profile ?? {id: '', url: ''}
            }
          });
        } else {
          set({
            auth,
            user: null
          });
        }
      },
      setUser: (user) =>
        set({
          user: {
            ...(state().user ?? {}),
            ...user
          } as User
        }),
      clear: () => set({...defaultUserState}),
    }),
    {
      name: "user",
    }
  )
)