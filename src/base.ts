import FormData from 'form-data';
import * as nf from 'node-fetch';

export type Fetch = (url: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface ClientOptions {
  baseUrl: string;
  apiKey: string;
  fetch?: Fetch;
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
  private fetch: Fetch;
  constructor({ baseUrl, apiKey, fetch }: ClientOptions) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.fetch = fetch ?? (nf.default as unknown as Fetch);
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number>) {
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.keys(params).forEach((key) => url.searchParams.append(key, String(params[key])));
    }
    return url.toString();
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, params } = options;

    const url = this.buildUrl(endpoint, params);

    const config: RequestInit = {
      method,
      headers: {
        'X-API-Key': this.apiKey,
        ...headers,
      },
    };

    if (body) {
      if (body instanceof FormData) {
        config.body = body as any;
      } else {
        config.body = JSON.stringify(body);
        config.headers = { 'Content-Type': 'application/json', ...config.headers };
      }
    }

    try {
      const response = await this.fetch(url, config as any);

      if (!response.ok) {
        console.log(await response.text());
        throw new Error(`Request failed with status ${response.status}`);
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }

      return response.text() as unknown as T;
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
