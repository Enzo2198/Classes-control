// import {decodeToken, isTokenExpired, type LoginCredentials, postMethod, type TokenResponse} from "../utils";
//
// export const authService = {
//   /*************** LOGIN ***************/
//   login: async (credentials: LoginCredentials): Promise<TokenResponse> => {
//     const response = await postMethod('/auth/login', credentials);
//
//     if (!response || !response.accessToken) {
//       throw new Error('Login failed');
//     }
//
//     const decoded = decodeToken(response.accessToken);
//     console.log(decoded);
//     if (!decoded || isTokenExpired(response.accessToken)) {
//       throw new Error('Invalid token received');
//     }
//
//     return response;
//   },
//
//   // Refresh token
//   refreshToken: async (refreshToken: string): Promise<TokenResponse> => {
//     const response = await postMethod('/auth/refresh', { refreshToken });
//
//     if (!response || !response.accessToken) {
//       throw new Error('Refresh token failed');
//     }
//
//     const decoded = decodeToken(response.accessToken);
//     if (!decoded || isTokenExpired(response.accessToken)) {
//       throw new Error('Invalid token after refresh')
//     }
//
//     return response;
//   },
//
//   // Logout
//   logout: async (): Promise<void> => {
//     return Promise.resolve();
//   }
// }
//
