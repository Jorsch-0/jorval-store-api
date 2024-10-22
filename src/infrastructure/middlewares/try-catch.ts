import { NextFunction, Request, Response } from 'express';
// import { CustomError } from './CustomError';

type AsyncExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// export const asyncErrorHandler = (func: AsyncExpressMiddleware) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     func(req, res, next).catch((err: CustomError) => next(err));
//   };
// };

export const tryCatch = (func: AsyncExpressMiddleware) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await func(req, res, next);
  } catch (err) {
    next(err);
  }
};
