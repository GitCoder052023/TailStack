import express from 'express';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './middlewares/cors';
import routes from './routes';
import { HEALTH_CHECK_RESPONSE, NOT_FOUND_RESPONSE, API_BASE, HEALTH_CHECK, HTTP_STATUS } from './constant';

const app = express();

// Middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use(API_BASE, routes);

// Health check endpoint
app.get(HEALTH_CHECK, (req, res) => {
  res.json(HEALTH_CHECK_RESPONSE);
});

// 404 handler
app.use((req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    ...NOT_FOUND_RESPONSE,
    message: `Route ${req.path} not found`,
  });
});

export default app;

