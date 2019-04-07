import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { Swagger } from './Rest/CommonRest/Swagger/swagger';
import { AppModule } from './Rest/Modules/MainModule/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, skipMissingProperties: true }));
  Swagger.setup(app);
  await app.listen(3000);
}
// noinspection JSIgnoredPromiseFromCall
bootstrap();
