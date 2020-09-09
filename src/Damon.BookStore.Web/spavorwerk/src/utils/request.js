import axios from 'axios';
import store from '@/store';
import { getAccessToken, getTokenType } from '@/utils/auth';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${getTokenType()} ${getAccessToken()}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  error => Promise.reject(error),
);

export default service;
