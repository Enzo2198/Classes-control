import {postMethod, type UserAuth} from "../utils";
import {useUser} from "../plugins/user.ts";
import {toast} from "react-toastify";

/******** Refresh tokens and update Zustand store ********/
export const refreshToken = async (): Promise<UserAuth> => {
  const userAuth = useUser.getState().auth
  if (!userAuth.refreshToken) throw new Error("No refresh token available");

  try {
    const payload = {refreshToken: userAuth.refreshToken};
    const data: UserAuth = await postMethod('/auth/refresh', payload)
    if (!data) throw new Error('Refresh token API returned null');

    // Update in Zustand store
    useUser.getState().setAuth({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    })

    return data;
  } catch (error) {
    console.error('Token refresh failed', error);
    useUser.getState().clear()
    toast.error('Session expired. Please try again.');
    window.location.href = '/login';
    throw new Error('Failed to refresh token');
  }
}

/******** Get a valid accessToken ********/
export const getValidAccessToken = async (): Promise<string | null> => {
  const {accessToken} = useUser.getState().auth;

  if (!accessToken) {
    try {
      const data = await refreshToken()
      return data.accessToken
    } catch {
      return null;
    }
  }

  return accessToken;
}
