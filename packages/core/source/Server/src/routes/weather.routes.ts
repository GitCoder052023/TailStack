import { Router } from 'express';
import { WeatherController } from '../controller/weather.controller';

const router = Router();

router.get('/location', WeatherController.getWeatherByLocation);
router.get('/coordinates', WeatherController.getWeatherByCoordinates);

export default router;

