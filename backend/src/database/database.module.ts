import { Module, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('DatabaseModule');
        const uri = configService.getOrThrow<string>('MONGODB_URI');

        return {
          uri,
          retryAttempts: MAX_RETRIES,
          retryDelay: BASE_DELAY_MS,
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              logger.log('MongoDB connection established successfully.');
            });

            connection.on('error', (error: Error) => {
              logger.error(
                `MongoDB connection error: ${error.message}`,
                error.stack,
              );
            });

            connection.on('disconnected', () => {
              logger.warn('MongoDB connection lost. Mongoose will attempt to reconnect.');
            });

            return connection;
          },
          connectionErrorFactory: (error: Error) => {
            logger.error(
              `MongoDB initial connection failed: ${error.message}`,
              error.stack,
            );
            return error;
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
