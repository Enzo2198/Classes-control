import type {AxiosRequestConfig} from "axios";
import apiClient from "../auth/interceptors";

export const getMethod = async (endpoint: string, config?: AxiosRequestConfig) => {
  try{
    const {data} = await apiClient.get(endpoint, config ?? {});
    return data;
  }catch(e){
    console.log(e);
  }

  return null;
}

export const postMethod = async (endpoint: string, payload: any, config?: AxiosRequestConfig) => {
  try{
    const {data} = await apiClient.post(endpoint, payload, config ?? {});
    return data;
  }catch(e){
    console.log(e);
  }

  return null;
}

export const putMethod = async (endpoint: string, payload: any, config?: AxiosRequestConfig) => {
  try {
    const {data} = await apiClient.put(endpoint, payload, config ?? {});
    return data;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export const deleteMethod = async (endpoint: string, config?: AxiosRequestConfig) => {
  try {
    const {data} = await apiClient.delete(endpoint, config ?? {});
    return data;
  } catch (e) {
    console.log(e);
  }

  return null;
}