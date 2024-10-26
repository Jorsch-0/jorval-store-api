import { HttpStatusCode } from '@/infrastructure/utils/constants';

export class CustomError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly status: string;
  public readonly isOperational: boolean = true;
  public readonly code: string;

  constructor(statusCode: HttpStatusCode, message: string, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    this.code = code;
  }

  static notFound(message: string, code?: string) {
    return new CustomError(HttpStatusCode.NOT_FOUND, message, code || 'not_found');
  }

  static internal(message: string, code?: string) {
    return new CustomError(HttpStatusCode.INTERNAL_SERVER_ERROR, message, code || 'internal_server_error');
  }

  static badRequest(message: string, code?: string) {
    return new CustomError(HttpStatusCode.BAD_REQUEST, message, code || 'bad_request');
  }

  static unauthorized(message: string, code?: string) {
    return new CustomError(HttpStatusCode.UNAUTHORIZED, message, code || 'unauthorized');
  }

  static forbidden(message: string, code?: string) {
    return new CustomError(HttpStatusCode.FORBIDDEN, message, code || 'forbidden');
  }
}
