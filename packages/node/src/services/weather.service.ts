import axios from 'axios';
import { WeatherData } from '../types/weather';
import { WEATHER_API_BASE_URL, WEATHER_API_FORMAT, WEATHER_API_USER_AGENT } from '../constant/weather';

export class WeatherService {
  /**
   * Fetch weather data by location name
   * Uses wttr.in which supports GET requests without authentication
   */
  static async getWeatherByLocation(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get(
        `${WEATHER_API_BASE_URL}/${encodeURIComponent(location)}`,
        {
          params: {
            format: WEATHER_API_FORMAT, // JSON format
          },
          headers: {
            'User-Agent': WEATHER_API_USER_AGENT,
          },
        }
      );

      const data = response.data;
      
      // Transform wttr.in response to our WeatherData format
      const current = data.current_condition[0];
      const locationData = data.nearest_area[0];
      
      return {
        location: {
          name: locationData.areaName[0].value,
          region: locationData.region[0].value,
          country: locationData.country[0].value,
          lat: parseFloat(locationData.latitude),
          lon: parseFloat(locationData.longitude),
          localtime: current.localObsDateTime || new Date().toISOString(),
        },
        current: {
          temp_c: parseFloat(current.temp_C),
          temp_f: parseFloat(current.temp_F),
          condition: {
            text: current.weatherDesc[0].value,
            icon: `https://wttr.in/${current.weatherCode}.png`,
          },
          humidity: parseFloat(current.humidity),
          wind_kph: parseFloat(current.windspeedKmph),
          wind_dir: current.winddir16Point,
          pressure_mb: parseFloat(current.pressure),
          feelslike_c: parseFloat(current.FeelsLikeC),
          feelslike_f: parseFloat(current.FeelsLikeF),
          uv: parseFloat(current.uvIndex || '0'),
          vis_km: parseFloat(current.visibility || '0'),
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.status === 404
            ? 'Location not found. Please try a different location.'
            : `Failed to fetch weather data: ${error.message}`
        );
      }
      throw new Error('An unexpected error occurred while fetching weather data');
    }
  }

  /**
   * Fetch weather data by coordinates (lat, lon)
   */
  static async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(
        `${WEATHER_API_BASE_URL}/${lat},${lon}`,
        {
          params: {
            format: WEATHER_API_FORMAT, // JSON format
          },
          headers: {
            'User-Agent': WEATHER_API_USER_AGENT,
          },
        }
      );

      const data = response.data;
      const current = data.current_condition[0];
      const locationData = data.nearest_area[0];
      
      return {
        location: {
          name: locationData.areaName[0].value,
          region: locationData.region[0].value,
          country: locationData.country[0].value,
          lat: parseFloat(locationData.latitude),
          lon: parseFloat(locationData.longitude),
          localtime: current.localObsDateTime || new Date().toISOString(),
        },
        current: {
          temp_c: parseFloat(current.temp_C),
          temp_f: parseFloat(current.temp_F),
          condition: {
            text: current.weatherDesc[0].value,
            icon: `https://wttr.in/${current.weatherCode}.png`,
          },
          humidity: parseFloat(current.humidity),
          wind_kph: parseFloat(current.windspeedKmph),
          wind_dir: current.winddir16Point,
          pressure_mb: parseFloat(current.pressure),
          feelslike_c: parseFloat(current.FeelsLikeC),
          feelslike_f: parseFloat(current.FeelsLikeF),
          uv: parseFloat(current.uvIndex || '0'),
          vis_km: parseFloat(current.visibility || '0'),
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.status === 404
            ? 'Location not found. Please try different coordinates.'
            : `Failed to fetch weather data: ${error.message}`
        );
      }
      throw new Error('An unexpected error occurred while fetching weather data');
    }
  }
}

