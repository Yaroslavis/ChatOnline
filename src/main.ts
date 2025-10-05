import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // 👈 Разрешаем фронту
    methods: ['GET', 'POST'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
