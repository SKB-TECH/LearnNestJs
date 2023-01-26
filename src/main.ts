import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { DurationInterceptor } from 'src/intercepteur/duration/duration.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: ['http://localhost:3000'],
  };

  dotenv.config();
  app.enableCors(corsOptions);
  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new DurationInterceptor());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
