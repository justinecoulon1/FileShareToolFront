import axios, { AxiosRequestConfig } from 'axios';
import { getLocalStorageItem } from '../../local-storage/local-storage.utils';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:8080/api',
};

export const fstAxios = axios.create(axiosConfig);

fstAxios.interceptors.request.use((config) => {
  config.headers['accessToken'] = getLocalStorageItem('accessToken');
  return config;
});
