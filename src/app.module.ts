import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecondModule } from './second/second.module';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { Router } from 'express';
import {
  HelmetHpkpMiddleware,
  HelmetMiddleware,
} from '@nest-middlewares/helmet';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvModule } from './cv/cv.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    SecondModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CvModule,
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirstMiddleware)
      .forRoutes({
        path: 'todo',
        method: RequestMethod.GET,
      })
      .apply(HelmetMiddleware)
      .forRoutes('');
    // .apply(Logger)
    // .forRoutes('');
  }
}
