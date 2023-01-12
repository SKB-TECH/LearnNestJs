import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecondModule } from './second/second.module';
import { TodoController } from './todo/todo.controller';

@Module({
  imports: [SecondModule],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule {}
