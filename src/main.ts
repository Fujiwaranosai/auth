import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { GlobalValidationPipe } from './pipes/global-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    options: {
      host: process.env.HOST ? process.env.HOST : 'localhost',
      port: process.env.PORT ? Number(process.env.PORT) : 4000,
    },
    transport: Transport.TCP,
  });
  app.useGlobalPipes(new GlobalValidationPipe());
  app.listen(() => console.log('auth microservice is running'));
}

bootstrap().then(() => console.log('done bootstrap'));
