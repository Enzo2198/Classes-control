import api from '../plugins/api.ts'
import { toast } from "react-toastify";
import {isAxiosError} from "axios";

const showSuccessMsg = (action = 'Save') => toast.success(`${action} successfully!`)
const showErrorMsg = (action = 'Save') => toast.error(`${action} failed!`)

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
    showSuccessMsg()
    return data
  } catch (e) {
    console.error('POST error:', e)
    showErrorMsg()
    return null
  }
}

export const putMethod = async <T>(endpoint: string, payload: unknown): Promise<T | null> => {
  try {
    const { data } = await api.put<T>(endpoint, payload)
    showSuccessMsg('Update')
    return data
  } catch (e) {
    console.error('PUT error:', e)
    showErrorMsg('Update')
    return null
  }
}

export const deleteMethod = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const { data } = await api.delete<T>(endpoint)
    showSuccessMsg('Delete')
    return data
  } catch (e) {
    console.error('DELETE error:', e)
    showErrorMsg('Delete')
    return null
  }
}