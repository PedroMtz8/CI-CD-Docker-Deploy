import loggerConfig from '@/config/logger.config';
import { LOGGER, loggerFactory } from '@/config/logger.factory';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forFeature(loggerConfig)],
  providers: [loggerFactory],
  exports: [LOGGER],
})
export class LoggerModule { }