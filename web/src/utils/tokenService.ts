import {getCookie} from "../stores";
import {refreshToken} from "../auth/interceptors.ts";

export const decodeToken = (token: string) => {
  try {
    // Check token exists
    if (!token || token.split('.').length !== 3) return false

    // Decode payload
    const payloadBade64 = token.split('.')[1]
    const payloadJson = atob(payloadBade64)
    return JSON.parse(payloadJson)
  } catch (e) {
    console.error('Decode token error:', e)
    return null
  }
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = decodeToken(token)
    if (!exp) return true;

    const buffer = 2 * 60 * 1000;
    const now = Date.now() / 1000;

    return exp < now + buffer;
  } catch (e) {
    return true
  }
}

export const getUserInfo = (token: string) => {
  try {
    return decodeToken(token)
  } catch (e) {
    return null
  }
}

export const getValidAccessToken = async () => {
  const accessToken: string | null = getCookie('accessToken')
  if (!accessToken || isTokenExpired(accessToken)) {
    try {
      const { accessToken: newAccessToken } = await refreshToken()
      return newAccessToken
    } catch (e) {
      console.error('Refresh token failed:', e)
      return null
    }
  }
  return accessToken
}