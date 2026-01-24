import dotenv from 'dotenv';
import { DEFAULT_PORT, DEFAULT_NODE_ENV, DEFAULT_CORS_ORIGIN } from '../constant';

dotenv.config();

export const config = {
  port: process.env.PORT || DEFAULT_PORT,
  nodeEnv: process.env.NODE_ENV || DEFAULT_NODE_ENV,
  corsOrigin: process.env.CORS_ORIGIN || DEFAULT_CORS_ORIGIN,
};

