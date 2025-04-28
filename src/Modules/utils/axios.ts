// src/utils/axios.ts
import axios from 'axios';
import { getStorage } from './storage';
import { VerificationResponse } from '@/types';

const tax_api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TAX_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
tax_api.interceptors.request.use(
  (config) => {
    const authData = getStorage<VerificationResponse>('token');

    if (authData?.token) {
      config.headers['Authorization'] = `Bearer ${authData.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default tax_api;
