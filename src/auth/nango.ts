import fetch from 'node-fetch';
import { Response } from 'node-fetch';

/**
 * Get credentials from Nango
 */
export async function get_connection_credentials(): Promise<{ [key: string]: any }> {
  const connection_id = process.env.NANGO_CONNECTION_ID;
  const integration_id = process.env.NANGO_INTEGRATION_ID;
  const base_url = process.env.NANGO_BASE_URL;
  const secret_key = process.env.NANGO_SECRET_KEY;
  
  if (!connection_id || !integration_id || !base_url || !secret_key) {
    throw new Error('Missing required Nango environment variables');
  }

  const url = `${base_url}/connection/${connection_id}`;
  const params = {
    provider_config_key: integration_id,
    refresh_token: 'true',
  };
  const headers = {
    Authorization: `Bearer ${secret_key}`,
  };

  const searchParams = new URLSearchParams(params);
  const fullUrl = `${url}?${searchParams}`;
  
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers,
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Get access token from Nango credentials
 */
export async function get_access_token(): Promise<string> {
  const credentials = await get_connection_credentials();
  const access_token = credentials?.credentials?.access_token;
  
  if (!access_token) {
    throw new Error('Access token not found in credentials');
  }
  
  return access_token;
}
