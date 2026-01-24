import { Request, Response } from 'express';
import { WeatherService } from '../services/weather.service';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constant';

export class WeatherController {
  /**
   * Get weather by location name
   */
  static async getWeatherByLocation(req: Request, res: Response): Promise<void> {
    try {
      const { location } = req.query;

      if (!location || typeof location !== 'string') {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          error: ERROR_MESSAGES.BAD_REQUEST,
          message: ERROR_MESSAGES.LOCATION_REQUIRED,
        });
        return;
      }

      const weatherData = await WeatherService.getWeatherByLocation(location);
      res.json(weatherData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
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
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          error: ERROR_MESSAGES.BAD_REQUEST,
          message: ERROR_MESSAGES.LAT_LON_REQUIRED,
        });
        return;
      }

      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lon as string);

      if (isNaN(latitude) || isNaN(longitude)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          error: ERROR_MESSAGES.BAD_REQUEST,
          message: ERROR_MESSAGES.INVALID_COORDINATES,
        });
        return;
      }

      const weatherData = await WeatherService.getWeatherByCoordinates(latitude, longitude);
      res.json(weatherData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }
}

