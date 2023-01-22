import { Injectable } from '@nestjs/common';
import { Todo } from './entite/to.entity';

@Injectable()
export class TodoService {
  todos: Todo[];

  getTodo(): Todo[] {
    return this.todos;
  }
}
