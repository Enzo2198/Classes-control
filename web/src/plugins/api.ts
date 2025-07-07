import axios from "axios";

const api = axios.create({
  baseURL: 'https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api