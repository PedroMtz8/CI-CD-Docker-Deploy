import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './env-config.loader';
import { envSchemaValidator } from './env/env.validator';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configLoader],
    envFilePath: '.env',
    isGlobal: true,
    validationSchema: envSchemaValidator,
  })],
  exports: [ConfigModule],
})
export class AppConfigModule { }