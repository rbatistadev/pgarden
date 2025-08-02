import axios from 'axios';

export const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use(
    res => res,
    error => {
      if (error.response?.status === 401) {
        console.warn('No autorizado, redireccionar si es necesario');
        // window.location.href = '/login'; // cuidado en server components
      }
      return Promise.reject(error);
    },
  );

  return instance;
};
