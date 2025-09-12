import {api} from "../../plugins/api.ts";

export interface RefreshTokenRequest {
  refreshToken: string
}
export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

export async function refreshToken(data: RefreshTokenRequest) {
  return (
    await api.post<RefreshTokenResponse>("/login/get_new_token/", data)
  ).data
}