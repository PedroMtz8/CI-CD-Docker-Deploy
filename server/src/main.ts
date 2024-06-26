import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import logger from '@config/logger.config';
import setupSwagger from '@config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { setupGlobalPipes } from './config/setupValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger
  })

  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT');
  const dbname = configService.get('DATABASE_NAME');
  console.log('PORT', PORT);
  console.log('dbname', dbname);

  const isProd = configService.get('NODE_ENV') === 'production';

  setupGlobalPipes(app);

  app.enableCors({
    origin: true,
  });

  if (!isProd) {
    setupSwagger(app);
  }

  await app.listen(PORT, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
