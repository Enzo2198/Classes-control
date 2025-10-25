// import {deleteCookie, getCookie, setCookie, useAuthStore} from "../stores";
// import {isTokenExpired} from "../utils";
// import {authService} from "./authService.ts";
//
// class AuthManager {
//   private static instance: AuthManager;
//
//   public static getInstance(): AuthManager {
//     if (!AuthManager.instance) {
//       AuthManager.instance = new AuthManager();
//     }
//     return AuthManager.instance;
//   }
//
//   // Get token valid ( refresh if can )
//   async getValidToken(): Promise<string | null> {
//     const accessToken = getCookie('accessToken');
//     const refreshToken = getCookie('refreshToken');
//
//     if (!accessToken) return null;
//
//     // Token is still valid
//     if (!isTokenExpired(accessToken)) {
//       this.syncWithStore(accessToken, refreshToken);
//       return accessToken;
//     }
//
//     // Token expired try refresh
//     if (refreshToken && !isTokenExpired(refreshToken)) {
//       try {
//         const newTokens = await authService.refreshToken(refreshToken);
//
//         // Save newToken
//         setCookie('accessToken', newTokens.accessToken, 86400);
//         setCookie('refreshToken', newTokens.refreshToken, 604800);
//
//         this.syncWithStore(newTokens.accessToken, newTokens.refreshToken);
//
//         return newTokens.accessToken;
//       } catch (error) {
//         console.error('Refresh token failed', error);
//         this.clearAuth()
//         return null
//       }
//     }
//     this.clearAuth()
//     return null;
//   }
//
//   // Sync cookie with store
//   private syncWithStore(accessToken: string, refreshToken: string | null = ''): void {
//     const { setAuth } = useAuthStore.getState();
//
//     const authData = {
//       accessToken,
//       refreshToken: refreshToken || ''
//     }
//     setAuth(authData);
//   }
//
//   // Clear auth data
//   clearAuth(): void {
//     deleteCookie('accessToken');
//     deleteCookie('refreshToken');
//
//     const { clear } = useAuthStore.getState()
//     clear()
//   }
//
//   // Logout
//   async logout(): Promise<void> {
//     this.clearAuth()
//   }
// }
//
// export const authManager = AuthManager.getInstance();