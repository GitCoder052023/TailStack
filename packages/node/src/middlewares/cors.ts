import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { CORS_METHODS, CORS_HEADERS, HTTP_STATUS } from '../constant';

export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', config.corsOrigin);
  res.header('Access-Control-Allow-Methods', CORS_METHODS);
  res.header('Access-Control-Allow-Headers', CORS_HEADERS);
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(HTTP_STATUS.OK);
  }
  
  next();
};

