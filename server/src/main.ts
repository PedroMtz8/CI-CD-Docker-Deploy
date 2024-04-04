import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { PORT } from 'src/constants/index';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

const port = PORT

async function bootstrap() {
  const isProd = true;
  // const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  // const app = await NestFactory.create(AppModule, {
  //   bufferLogs: true,
  // })

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // let's log errors into its own file
        new transports.File({
          filename: `logs/error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
        }),
        // logging all level
        new transports.File({
          filename: `logs/info.log`,
          level: 'info',
          format: format.combine(format.timestamp(), format.json()),
        }),
        // we also want to see logs in our console
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    }),
  });


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
