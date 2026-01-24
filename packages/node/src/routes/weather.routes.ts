import { Router } from 'express';
import { WeatherController } from '../controller/weather.controller';
import { WEATHER_ROUTES } from '../constant';

const router = Router();

router.get(WEATHER_ROUTES.LOCATION, WeatherController.getWeatherByLocation);
router.get(WEATHER_ROUTES.COORDINATES, WeatherController.getWeatherByCoordinates);

export default router;

