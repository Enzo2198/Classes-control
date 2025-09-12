import axios, {type AxiosError, type AxiosHeaders} from "axios";
import {useUser} from "./user.ts";
import {toast} from "react-toastify";
import {refreshToken} from "../Modules/auth/refreshToken.ts";


export const api = axios.create({
  baseURL: 'https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/'
})

api.interceptors.request.use((config) => {
  const accessToken = useUser.getState().auth.accessToken;
  if (accessToken) {
    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${accessToken}`,
    )
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config
    if (
      error.response?.status === 401 &&
      config?.url !== '/login/get_new_token/'
    ) {
      const userAuth = useUser.getState().auth
      if ( !userAuth.refreshToken ) {
        return Promise.reject(error);
      }
      try {
        const data = await refreshToken({ refreshToken: userAuth.refreshToken });
        if ( data ) {
          useUser.getState().setAuth(data)
          return api(config!)
        }
      } catch (error) {
        toast.error("Session expired, please re-login")
        useUser.getState().clear()
      }
    }
    return Promise.reject(error);
  }
);