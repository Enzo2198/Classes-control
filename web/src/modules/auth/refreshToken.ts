// import {postMethod} from "../../utils";
//
// export interface RefreshTokenRequest {
//   refreshToken: string
// }
// export interface RefreshTokenResponse {
//   accessToken: string
//   refreshToken: string
// }
//
// export async function refreshToken({ refreshToken }: { refreshToken: string }) {
//   try {
//     const data = await postMethod<{ access: string; refresh: string }>(
//       "login/get_new_token/",
//       { refresh: refreshToken }
//     );
//
//     if (!data || !data.access) {
//       return null;
//     }
//     return {
//       accessToken: data.access,
//       refreshToken: data.refresh,
//     };
//   } catch (err) {
//     console.error("Refresh token thất bại:", err);
//     return null;
//   }
// }
