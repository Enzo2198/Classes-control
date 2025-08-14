import { api } from '../plugins/api.ts'
import { isAxiosError } from "axios";

export const getNewToken = async () => {
  const refresh = localStorage.getItem('refresh')
  if (!refresh) throw new Error('No refresh token')

  try {
    const { data } = await api.post('/login/get_new_token/', { refresh })
    return data
  } catch (e) {
    throw new Error('Failed to refresh token')
  }
}

export const getMethod = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const { data } = await api.get<T>(endpoint);
    return data;
  } catch (e) {
    if (isAxiosError(e) && e.response?.status === 401) {
      await getNewToken();
      const { data } = await api.get<T>(endpoint);
      return data;
    }
    return null;
  }
};

export const postMethod = async <T>(endpoint: string, payload: unknown): Promise<T | null> => {
  try {
    const { data } = await api.post<T>(endpoint, payload)
    return data
  } catch (e) {
    console.error('POST error:', e)
    return null
  }
}

export const putMethod = async <T>(endpoint: string, payload: unknown): Promise<T | null> => {
  try {
    const { data } = await api.put<T>(endpoint, payload)
    return data
  } catch (e) {
    console.error('PUT error:', e)
    return null
  }
}

export const deleteMethod = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const { data } = await api.delete<T>(endpoint)
    return data
  } catch (e) {
    console.error('DELETE error:', e)
    return null
  }
}