import axios from 'axios';
import {getToken} from '@/storage';
import {API} from '@/constants';

const apiClient = axios.create({
  baseURL: API.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'MaDonViGoiAPI': API.MA_DON_VI_GOI_API,
    'Key': API.KEY_DON_VI_GOI_API
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;