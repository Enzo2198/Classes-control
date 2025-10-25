import axios, {type AxiosError, type AxiosHeaders} from "axios";
import {deleteCookie, getCookie, setCookie} from "../stores";
import {getUserInfo, getValidAccessToken} from "../utils";
import {toast} from "react-toastify";

// Main axios instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/************ Refresh Token ************/
export const refreshToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) throw new Error("No refreshToken");

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {refreshToken},
      {withCredentials: true}
    )
    const {accessToken: newAccessToken, refreshToken: newRefreshToken} = res.data;

    const {exp} = getUserInfo(newAccessToken)
    const now = Math.floor(Date.now() / 1000)
    const maxAge = exp - now

    setCookie("accessToken", newAccessToken, maxAge)

    if (newRefreshToken) {
      if (localStorage.getItem("rememberMe") === "true") {
        const expiresAt: number = parseInt(localStorage.getItem("refreshTokenExpiresAt") || "0")
        const remainingMs = expiresAt - Date.now()
        if (remainingMs > 0) {
          setCookie("refreshToken", newRefreshToken, Math.floor(remainingMs / 1000))
        } else {
          deleteCookie("refreshToken")
          localStorage.removeItem("refreshTokenExpiresAt")
          throw new Error("Refresh token is expired")
        }
      } else {
        setCookie("refreshToken", newRefreshToken)
      }
    }
    return {accessToken: newAccessToken}
  } catch (error) {
    console.error("Token refresh failed:", error)
    throw new Error("Failed to refresh token")
  }
}

/************ Interceptor handles auto refresh ************/
let refreshPromise: Promise<{ accessToken: string }> | null = null;

// Request interceptor - auto add token to header
apiClient.interceptors.request.use(
  async (config) => {
  const accessToken = await getValidAccessToken();
  if (accessToken) {
    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${accessToken}`);
  }
  return config;
})

// Response interceptor - handling expired token
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as any;

    if (config?._retry) {
      return Promise.reject(error);
    }

    // If error 401 and have not refresh token yet
    if (error.response?.status === 401 && !config?.url?.endsWith("/auth/refresh")) {
      try {
        if (!refreshPromise) {
          refreshPromise = refreshToken()
        }

        const {accessToken} = await refreshPromise;

        // Add new token and retry old request again
        config.headers = {
          ...(config.headers || {}),
          Authorization: `Bearer ${accessToken}`,
        };

        return apiClient(config);
      } catch (err) {
        refreshPromise = null
        deleteCookie("accessToken")
        deleteCookie("refreshToken")
        toast.error("Hết phiên đăng nhập, vui lòng đăng nhập lại")
        window.location.href = "/login"
      } finally {
        refreshPromise = null;
      }
    }
    return Promise.reject(error);
  }
)

export default apiClient;