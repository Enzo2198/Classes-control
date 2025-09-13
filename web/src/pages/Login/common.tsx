import {useUser} from "../../plugins/user.ts";
import {decodeToken} from "../../utils/jwt.ts";

export const isLogin = (): boolean => {
  const {accessToken} = useUser.getState().auth
  if (!accessToken) return false
  return isValidToken(accessToken)
}

export const isValidToken = (token: string): boolean => {
  const payload = decodeToken(token)
  if (!payload) return false

  // Check expiration
  const currentTimestamp = Math.floor(Date.now() / 1000)
  return payload.exp > currentTimestamp
};

export const logout = (redirectToLogin: boolean = true): void => {
  // Clear all auth storages
  useUser.getState().clear();

  if (redirectToLogin) {
    window.location.href = '/login';
  }
};

