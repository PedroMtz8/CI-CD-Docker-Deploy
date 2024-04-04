import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { PORT } from 'src/constants/index';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = PORT

async function bootstrap() {
  // const isProd = process.env.NODE_ENV === 'production';
  const isProd = true;
  // console.log('isProd', isProd)
  const app = isProd ?
    await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }))
    :
    await NestFactory.create(AppModule);

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
