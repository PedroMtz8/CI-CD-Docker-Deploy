import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './env-config.loader';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configLoader],
    envFilePath: '.env',
    isGlobal: true
  })],
  exports: [ConfigModule],
})
export class AppConfigModule { }