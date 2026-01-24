/**
 * API Configuration
 * In the React template, we call external APIs directly from the client.
 */
export const API_CONFIG = {
  weather: {
    baseURL: 'https://wttr.in',
    userAgent: 'TailStack Weather App',
  },
} as const;
