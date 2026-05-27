import { ValidationPipe, LogLevel, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function resolveLogLevels(): LogLevel[] {
  const envLevel = (process.env.LOG_LEVEL || 'log').toLowerCase() as LogLevel;
  const priority: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];

  const index = priority.indexOf(envLevel);
  if (index === -1) {
    return ['error', 'warn', 'log'];
  }

  return priority.slice(0, index + 1);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: resolveLogLevels(),
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`Application is running on: http://localhost:${port}/api`);
}

bootstrap();
