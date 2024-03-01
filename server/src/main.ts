import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { PORT } from 'src/constants/index';

const port = PORT

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
