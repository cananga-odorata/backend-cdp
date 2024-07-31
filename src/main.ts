import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 5000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:[
      'http://localhost:3000',
      'https://localhost:3000',
      'https://cdp-frontned-t.web.app',
      'https://cdp-frontned-t.web.app/pages'
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(port);
}
bootstrap();
