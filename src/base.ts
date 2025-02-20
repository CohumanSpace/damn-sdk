import axios, { AxiosInstance } from 'axios';

export interface ClientOptions {
  baseUrl: string;
  apiKey: string;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  body?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, string | number>;
}

export abstract class BaseClient {
  baseUrl: string;
  apiKey: string;
  axios: AxiosInstance;
  constructor({ baseUrl, apiKey }: ClientOptions) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.axios = axios.create({ baseURL: this.baseUrl });
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number>) {
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.keys(params).forEach((key) => url.searchParams.append(key, String(params[key])));
    }
    return url.toString();
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, params } = options;

    const url = this.buildUrl(endpoint, params);

    let headers = {
      'X-API-Key': this.apiKey,
      ...options.headers,
    } as Record<string, string>;

    if (body && body instanceof FormData) {
      headers = { ...headers, 'Content-Type': 'multipart/form-data' };
    }

    try {
      const response = await this.axios.request({ method, headers, url, data: body });
      return response.data as unknown as T;
    } catch (error) {
      throw error;
    }
  }

  public get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  public post<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  }

  public put<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  }

  public delete<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', params });
  }

  public patch<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body, headers });
  }
}
