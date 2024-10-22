export class CustomError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly isOperational: boolean = true;
  public readonly code: string;

  constructor(statusCode: number, message: string, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    this.code = code;
  }

  static notFound(message: string, code?: string) {
    return new CustomError(404, message, code || 'not_found');
  }

  static internal(message: string, code?: string) {
    return new CustomError(500, message, code || 'internal_server_error');
  }

  static badRequest(message: string, code?: string) {
    return new CustomError(400, message, code || 'bad_request');
  }

  static unauthorized(message: string, code?: string) {
    return new CustomError(401, message, code || 'unauthorized');
  }

  static forbidden(message: string, code?: string) {
    return new CustomError(403, message, code || 'forbidden');
  }
}
