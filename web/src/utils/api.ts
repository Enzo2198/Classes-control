import { api } from '../plugins/api.ts'

export const getMethod = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const { data } = await api.get<T>(endpoint);
    return data;
  } catch (e) {
    console.error('GET error', e)
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