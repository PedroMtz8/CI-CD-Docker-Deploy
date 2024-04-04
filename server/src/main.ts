import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { PORT } from 'src/constants/index';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { instance } from './logger/winston.config';
import { LoggerFactory } from './logger/LoggerFactory';

const port = PORT

async function bootstrap() {
  const isProd = true;
  // const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory('NestJS'),
  })


  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true,
  });

  if (!isProd) {

    const config = new DocumentBuilder()
      .setTitle('Blogs example')
      .addBearerAuth()
      .setDescription('The blogs API description')
      .setVersion('1.0')
      .addTag('blogs')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
