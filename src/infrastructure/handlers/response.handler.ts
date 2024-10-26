import { env } from '@/infrastructure/config/env';
import { CustomError } from '@/domain/errors/custom.error';
import { Response } from 'express';
import { ZodError } from 'zod';
import { HttpStatusCode } from '../utils/constants';

const checkErrorType = (err: Error): CustomError => {
  if (err instanceof CustomError) {
    return err;
  }
  if (err instanceof ZodError) {
    const fieldErrors = err.errors.map((error) => `${error.message} at "${error.path.join('.')}"`).join('; ');
    return CustomError.badRequest(`Validation error: ${fieldErrors}`, 'invalid_data');
  }

  return CustomError.internal('Something went wrong! Please try again later.');
};

export class ResponseHandler {
  static success(res: Response, data: unknown, statusCode: HttpStatusCode) {
    res.status(statusCode).json({
      status: 'success',
      data,
    });
  }

  static error(err: Error, res: Response) {
    const customError = checkErrorType(err);

    if (env.NODE_ENV === 'development') {
      res.status(customError.statusCode).json({
        statusCode: customError.statusCode,
        status: customError.status,
        message: customError.message,
        code: customError.code,
        error: err,
        stack: err.stack,
      });
    } else {
      res.status(customError.statusCode).json({
        status: customError.status,
        message: customError.message,
        code: customError.code,
      });
    }
  }
}
