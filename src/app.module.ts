import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecondModule } from './second/second.module';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { FirstMiddleware } from './middlewares/first/first.middleware';

@Module({
  imports: [SecondModule],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes('todo');
  }
}
