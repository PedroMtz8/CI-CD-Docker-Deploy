import { Inject, MiddlewareConsumer, Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@/config/config.module';
import { UsersModule } from '@/users/users.module';
import { AuthModule } from '@/auth/auth.module';
import { BlogsModule } from '@/blogs/blogs.module';
import { CorrelationIdMiddleware } from '@/correlation-id/correlation-id.middleware';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@/loggerV2/logger.module';
import { LOGGER } from '@/config/logger.factory';
import { Logger } from 'winston';
import { RequestLoggerMiddleware } from '@/request-logger.middleware';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    AppConfigModule,
    // LoggerModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule /* implements OnApplicationBootstrap */ {
  // constructor(@Inject(LOGGER) private logger: Logger) { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware, RequestLoggerMiddleware).forRoutes('*');
  }
  // onApplicationBootstrap(): any {
  //   this.logger.info('Application bootstrap success!', {
  //     type: 'APP_BOOTSTRAP',
  //   });
  // }
}
