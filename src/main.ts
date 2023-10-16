import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AppConfigService } from './configuration/app-config.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
    const appConfig: AppConfigService = app.get(AppConfigService);

    await app.listen(appConfig.port, () => {
      logger.log(`Service started at port ${appConfig.port}...`);
    });
  } catch (error) {
    logger.error(
      `Application failed to start due to configuration error: ${error.message}`,
    );
    process.exit(1);
  }
}
bootstrap();
