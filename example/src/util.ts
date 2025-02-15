import 'dotenv/config';
import { ApiClient } from '@damn-fun/sdk';

export function getApiClient() {
  const baseUrl = process.env.API_BASE_URL!;
  const apiKey = process.env.API_KEY!;
  const client = new ApiClient({ baseUrl, apiKey });
  return client;
}
