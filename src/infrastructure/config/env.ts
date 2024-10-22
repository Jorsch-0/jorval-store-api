import 'dotenv/config';
import { get } from 'env-var';

export const env = {
  PORT: get('PORT').default('8000').asPortNumber(),
  NODE_ENV: get('NODE_ENV').default('development').asEnum(['development', 'production']),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  DATABASE_URL: get('DATABASE_URL').required().asUrlString(),
  LOG_LEVEL: get('LOG_LEVEL').default('info').asEnum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
};
