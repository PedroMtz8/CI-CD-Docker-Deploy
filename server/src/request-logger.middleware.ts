import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const statusCode = res.statusCode;
      const correlationId = req.headers['x-correlation-id'];

      if (statusCode === 401 || statusCode === 404 || statusCode === 405) {
        this.logger.warn(`[${req.method}] ${req.url} - ${statusCode}  - Correlation ID: ${correlationId}`);
      } else if (statusCode === 400 || statusCode >= 500) {
        this.logger.error(`[${req.method}] ${req.url} - ${statusCode}  - Correlation ID: ${correlationId}`);
      } else {
        this.logger.log(`[${req.method}] ${req.url} - ${statusCode} - Correlation ID: ${correlationId}`);
      }
    });

    next();
  }
}
