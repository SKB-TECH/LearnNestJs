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

@Module({
  imports: [SecondModule],
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
