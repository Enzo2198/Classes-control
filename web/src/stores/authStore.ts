// import {create} from "zustand";
// import type {TokenAuth, User, AuthState} from "../utils";
// import {persist} from "zustand/middleware";
//
// const defaultUserState: { auth: TokenAuth, user: User } = {
//   auth: {accessToken: '', refreshToken: ''},
//   user: {
//     id: null,
//     name: "",
//     role: "",
//     email: "",
//     createdAt: "",
//     updatedAt: "",
//     isDeleted: false,
//     profile: {
//       id: null,
//       url: ""
//     }
//   },
// }
//
// export const useAuthStore = create<AuthState>() (
//   persist(
//     (set, get) => ({
//       ...defaultUserState,
//       isAuthenticated: false,
//       isLoading: true,
//
//       setAuth: (auth: TokenAuth) => {
//         const currentAuth = get().auth
//         if (currentAuth.accessToken !== auth.accessToken || currentAuth.refreshToken !== auth.refreshToken) {
//           set({auth})
//         }
//       },
//
//       setUser: (user: Partial<User>) => {
//         const currentUser = get().user
//         if (JSON.stringify(currentUser) !== JSON.stringify({...currentUser, ...user})) {
//           set({user: {...currentUser, ...user}})
//         }
//       },
//
//       setAuthenticated: (value) => {
//         if (get().isAuthenticated !== value) {
//           set({ isAuthenticated: value });
//         }
//       },
//
//       setLoading: (value) => {
//         if (get().isLoading !== value) {
//           set({ isLoading: value });
//         }
//       },
//
//       clear: () => set({ ...defaultUserState, isAuthenticated: false, isLoading: false }),
//     }),
//     {
//       name: 'auth-storage',
//       partialize: (state) =>
//         Object.fromEntries(
//           Object.entries(state).filter(([key]) =>
//             ['auth', 'user', 'isAuthenticated'].includes(key)
//           )
//         )
//     }
//   )
// )