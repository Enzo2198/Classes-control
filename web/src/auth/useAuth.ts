// import {useNavigate} from "react-router";
// import {deleteCookie, getCookie, setCookie, useAuthStore} from "../stores";
// import {useRef, useState} from "react";
// import {decodeToken, isTokenExpired, type LoginCredentials, type TokenResponse} from "../utils";
// import { authService } from "./authService";
// import {toast} from "react-toastify";
//
// export const useAuth = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [user, setUser] = useState<TokenResponse>();
//
//   const isInitializing = useRef(false);
//
//   /*************** LOGIN ***************/
//   const login = async (credentials: LoginCredentials): Promise<TokenResponse> => {
//     setIsLoading(true);
//
//     try {
//       const tokens = await authService.login(credentials)
//
//       if (isTokenExpired(tokens.accessToken)) {
//         throw new Error("Token is expired")
//       }
//
//       // Save to store
//       setAuth(tokens)
//       setCookie('accessToken', tokens.accessToken, 86400)
//       setCookie('refreshToken', tokens.refreshToken, 604800)
//
//       const decodedUser = decodeToken(tokens.accessToken)
//       if (decodedUser) {
//         setUser({
//           id: decodedUser.id || decodedUser.sub,
//           name: decodedUser.name,
//           email: decodedUser.email,
//           role: decodedUser.role,
//         })
//       }
//
//       setAuthenticated(true);
//       navigate('/classes')
//
//       return tokens
//     } catch (error) {
//       console.error('Login error:', error)
//       clear()
//
//       deleteCookie('accessToken')
//       deleteCookie('refreshToken')
//
//       if (error instanceof Error && error.message.includes('token')) {
//         toast.error('Token không hợp lệ vui lòng thử lại')
//       } else {
//         toast.error('Email hoặc mật khẩu không chính xác');
//       } throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   }
//
//   // Logout
//   const logout = async () => {
//     try {
//       clear()
//       deleteCookie('accessToken')
//       deleteCookie('refreshToken')
//       setAuthenticated(false)
//       toast.success('Đăng xuất thành công')
//       navigate('/login')
//     } catch (error) {
//       console.error('Logout error:', error)
//       clear()
//       setAuthenticated(false)
//     }
//   }
//
//   const getValidToken = async (): Promise<string | null> => {
//
//
//     const accessTokenFromCookie = getCookie('accessToken');
//     const refreshTokenFromCookie = getCookie('refreshToken');
//
//     if (!accessTokenFromCookie) return null
//
//     if (!isTokenExpired(accessTokenFromCookie)) {
//       const { auth } = useAuthStore.getState()
//       if (auth.accessToken !== accessTokenFromCookie) {
//         setAuth({
//           accessToken: accessTokenFromCookie,
//           refreshToken: refreshTokenFromCookie || ''
//         });
//       }
//       return accessTokenFromCookie;
//     }
//
//     // If accessToken expired but have to refreshToken
//     if (refreshTokenFromCookie && !isTokenExpired(refreshTokenFromCookie)) {
//       try {
//         const newTokens = await authService.refreshToken(refreshTokenFromCookie)
//         setAuth(newTokens)
//         setCookie('accessToken', newTokens.accessToken, 86400);
//         setCookie('refreshToken', newTokens.refreshToken, 604800);
//         return newTokens.accessToken
//       } catch (error) {
//         console.error('Refresh token failed:', error)
//         clear()
//         deleteCookie('accessToken');
//         deleteCookie('refreshToken');
//         return null
//       }
//     }
//
//     clear()
//     deleteCookie('accessToken');
//     deleteCookie('refreshToken');
//     return null
//   }
//
//   // Initialize auth state when app start
//   const initializeAuth = async (): Promise<void> => {
//     if (isInitializing.current) {
//       return
//     }
//
//     isInitializing.current = true
//     setLoading(true)
//
//     try {
//       const token = await getValidToken()
//       if (token) {
//         setAuthenticated(true)
//
//         // Decode user info from token
//         const decodedUser = decodeToken(token)
//         if (decodedUser) {
//           setUser({
//             id: decodedUser.id || decodedUser.sub,
//             name: decodedUser.name,
//             email: decodedUser.email,
//             role: decodedUser.role,
//           })
//         }
//       } else {
//         console.log('❌ initializeAuth: No valid token, user is not authenticated');
//         setAuthenticated(false)
//       }
//     } catch (error) {
//       console.error('Initialize auth error:', error)
//       clear()
//       deleteCookie('accessToken');
//       deleteCookie('refreshToken');
//       setAuthenticated(false)
//     } finally {
//       setLoading(false)
//       isInitializing.current = false
//     }
//   }
//
//   return {
//     // State
//     auth, user, isAuthenticated, isLoading,
//
//     // Action
//     login, logout, getValidToken, initializeAuth, clear
//   }
// }