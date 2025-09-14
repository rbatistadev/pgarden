import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { createAxiosInstance } from '../config/axios.config';

export abstract class APIService {
  protected baseURL: string;
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.axiosInstance = createAxiosInstance(baseURL);
  }

  get(url: string, params = {}, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.get(url, {
      ...params,
      ...config,
    });
  }

  async post(url: string, data = {}, config: AxiosRequestConfig = {}) {
    return await this.axiosInstance.post(url, data, config);
  }

  put(url: string, data = {}, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.put(url, data, config);
  }

  delete(url: string, data?: unknown, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.delete(url, { data, ...config });
  }

  request(config = {}) {
    return this.axiosInstance(config);
  }
}
