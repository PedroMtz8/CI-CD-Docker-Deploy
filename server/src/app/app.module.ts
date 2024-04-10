import { AppConfigModule } from "@/config/config.module";
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from '@/app/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@/users/users.module';
import { AuthModule } from '@/auth/auth.module';
import { BlogsModule } from '@/blogs/blogs.module';
import { CorrelationIdMiddleware } from '@/middlewares/correlation-id.middleware';
import { RequestLoggerMiddleware } from '@/middlewares/request-logger.middleware';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from '@/db/db-connection.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmConfigModule,
    UsersModule,
    AuthModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware, RequestLoggerMiddleware).forRoutes('*');
  }
}
