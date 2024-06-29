import { IErrorData } from '@/domains';
import { useAuthStore } from '@/stores';
import axios, { AxiosError } from 'axios';

const HttpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

HttpClient.interceptors.request.use(
  (config: any) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HttpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<IErrorData>) => {
    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_BAD_RESPONSE') {
      return Promise.reject('Something went wrong! Please check network again.');
    }

    if (error.response?.data?.message) {
      return Promise.reject(error.response?.data?.message);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('auth');
      window.location.href = '/auth/sign-in';
      return Promise.reject(error);
    }

    return Promise.reject(
      error.response?.data || 'Something went wrong! Please check network again.'
    );
  }
);

export default HttpClient;
