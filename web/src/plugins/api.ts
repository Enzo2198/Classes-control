import axios, {type AxiosError, type AxiosHeaders, type AxiosRequestConfig} from "axios";
import {useUser} from "./user.ts";
import {toast} from "react-toastify";
import {refreshToken} from "../modules/auth/refreshToken.ts";


export const api = axios.create({
  baseURL: 'https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/'
})

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}[] = []

const processQueue = (token: string | null, error: AxiosError | null = null) => {
  failedQueue.forEach((prom) =>{
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  })
  failedQueue = []
}

api.interceptors.request.use((config) => {
  const accessToken = useUser.getState().auth.accessToken;
  if (accessToken && config.headers) {
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
    const config = error.config as AxiosRequestConfig & {
      retry?: boolean;
    }

    if (
      error.response?.status === 401 &&
      config&&
      !config.retry&&
      config?.url !== '/login/get_new_token/'
    ) {
      config.retry = true;
      const userAuth = useUser.getState().auth
      if ( !userAuth.refreshToken ) {
        console.warn("Không có refreshToken");
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (config.headers) {
                (config.headers as AxiosHeaders).set(
                  "Authorization",
                  `Bearer ${token}`,
                )
              }
              resolve(api(config))
            },
            reject,
          })
        })
      }

      isRefreshing = true;

      try {
        const data = await refreshToken({ refreshToken: userAuth.refreshToken });
        if ( data ) {
          useUser.getState().setAuth(data)
          processQueue(data.accessToken);

          if (config.headers) {
            (config.headers as AxiosHeaders).set(
              "Authorization",
              `Bearer ${data.accessToken}`,
            )
          }

          return api(config)
        }
      } catch (error) {
        processQueue(null, error as AxiosError);
        toast.error("Session expired, please re-login")
        useUser.getState().clear()
        window.location.href = "/login"
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);