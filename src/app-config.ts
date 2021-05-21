import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

export function appConfig(app: INestApplication, AppModule) {
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
}
