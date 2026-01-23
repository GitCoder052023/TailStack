import axios from 'axios';
import { API_CONFIG } from '@/config/api';
import type { WeatherData } from '@/types/weather';

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherApi = {
  /**
   * Get weather by location name
   */
  getWeatherByLocation: async (location: string): Promise<WeatherData> => {
    const response = await apiClient.get<WeatherData>(
      API_CONFIG.endpoints.weather.byLocation,
      {
        params: { location },
      }
    );
    return response.data;
  },

  /**
   * Get weather by coordinates
   */
  getWeatherByCoordinates: async (
    lat: number,
    lon: number
  ): Promise<WeatherData> => {
    const response = await apiClient.get<WeatherData>(
      API_CONFIG.endpoints.weather.byCoordinates,
      {
        params: { lat, lon },
      }
    );
    return response.data;
  },
};

