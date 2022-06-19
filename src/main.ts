import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import process from 'process';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  // let PORT = this.configService.get('PORT');

  await app.listen(4000);
}
bootstrap();
