import { Router } from 'express';
import weatherRoutes from './weather.routes';
import { WEATHER_ROUTES } from '../constant';

const router = Router();

router.use(WEATHER_ROUTES.BASE, weatherRoutes);

export default router;

