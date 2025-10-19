import axios, {type AxiosError, type AxiosHeaders} from "axios";
import {useUser} from "./user.ts";
import {refreshToken} from "../router/auth.ts";


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Request interceptor: add Authorization header from Zustand
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

// Response interceptor: handle 401, refresh token if necessary
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config

    if (
      error.response?.status === 401 &&
      config?.url !== '/auth/refresh'
    ) {
      try {
        await refreshToken();
        return api(config!) // Retry request new token

      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);