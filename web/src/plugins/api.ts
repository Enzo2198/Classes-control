import axios, {type AxiosHeaders} from "axios";


export const api = axios.create({
  baseURL: 'https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${token}`,
    )
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);