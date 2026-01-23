import { Request, Response } from 'express';
import { WeatherService } from '../services/weather.service';

export class WeatherController {
  /**
   * Get weather by location name
   */
  static async getWeatherByLocation(req: Request, res: Response): Promise<void> {
    try {
      const { location } = req.query;

      if (!location || typeof location !== 'string') {
        res.status(400).json({
          error: 'Bad Request',
          message: 'Location parameter is required',
        });
        return;
      }

      const weatherData = await WeatherService.getWeatherByLocation(location);
      res.json(weatherData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({
        error: 'Internal Server Error',
        message: errorMessage,
      });
    }
  }

  /**
   * Get weather by coordinates
   */
  static async getWeatherByCoordinates(req: Request, res: Response): Promise<void> {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        res.status(400).json({
          error: 'Bad Request',
          message: 'Both lat and lon parameters are required',
        });
        return;
      }

      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lon as string);

      if (isNaN(latitude) || isNaN(longitude)) {
        res.status(400).json({
          error: 'Bad Request',
          message: 'Lat and lon must be valid numbers',
        });
        return;
      }

      const weatherData = await WeatherService.getWeatherByCoordinates(latitude, longitude);
      res.json(weatherData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({
        error: 'Internal Server Error',
        message: errorMessage,
      });
    }
  }
}

