import { routes } from '@/application';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { ResponseHandler } from '../handlers/response.handler';
import { corsMiddleware } from '../middlewares/cors';
import { logger } from '../modules/logger';
// import { pinoHttp } from 'pino-http';
import cookieParser from 'cookie-parser';

export async function expressLoader(app: express.Application) {
  // app.use(pinoHttp({ logger }));

  app.use(corsMiddleware());
  app.use(helmet());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get('/', (_req, res) => {
    res.send('Ok!');
  });

  routes(app);

  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    logger.error(err);

    ResponseHandler.error(err, res);

    next();
  });
}
