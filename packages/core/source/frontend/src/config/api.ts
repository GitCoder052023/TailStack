export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  endpoints: {
    weather: {
      byLocation: '/api/weather/location',
      byCoordinates: '/api/weather/coordinates',
    },
  },
} as const;

