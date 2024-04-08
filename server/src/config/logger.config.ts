import { registerAs } from '@nestjs/config';
import winston from 'winston';

export const LOGGER_CONFIG_KEY = 'logger-config';

export default registerAs(LOGGER_CONFIG_KEY, () => {
  let format;
  const defaultMeta = {
    layer: 'App',
    service: process.env.SERVICE_NAME, // this is an optional meta field
    context: 'unspecified', // is overridden by the logger factory and the NestJSLoggerService
  };
  switch (process.env.NODE_ENV) {
    case 'production':
      format = winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      );
      break;
    default:
      format = winston.format.combine(
        winston.format.simple()
      );
      break;
  }
  return {
    winston: {
      level: process.env.LOGGER_MIN_LEVEL || 'debug',
      transports: [new winston.transports.Console()],
      format,
      defaultMeta,
    },
  };
});