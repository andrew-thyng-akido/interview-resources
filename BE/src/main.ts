import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable validation only benefits the corrected module (bad module skips DTO decorators or uses loose types)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  await app.listen(process.env.PORT || 3000);
  console.log(`Application running on port ${process.env.PORT || 3000}`);
}
bootstrap();
