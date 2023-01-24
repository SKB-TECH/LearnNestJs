import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entite/to.entity';
import { AddTodosDto } from './dto/add-todo.dto';

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  getTodo(): Todo[] {
    return this.todos;
  }

  addTodo(newTodo: AddTodosDto): Todo {
    const { name, description } = newTodo;
    let id;

    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }

    const todo = {
      id,
      name,
      description,
      createdAd: new Date(),
    };

    this.todos.push(todo);
    return todo;
  }

  getTodoById(id: number): Todo {
    const todos = this.todos.find((actuelTodo: Todo) => actuelTodo.id == id);
    if (todos) {
      return todos;
    } else {
      throw new NotFoundException(`L'id:${id} est introuvable `);
    }
  }

  deleteOneTodo(id: number) {
    const index = this.todos.findIndex((todo: Todo) => todo.id === +id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Votre id: ${id} est introuvable`);
    }

    return {
      message: `Task de l'id: ${id} a ete supprimer`,
      count: 1,
    };
  }

  updateOneTodo(id: number, data: Partial<Todo>) {
    const todo = this.getTodoById(id);
    todo.description = data.description ? data.description : todo.description;
    todo.name = data.name ? data.name : todo.name;
    return todo;
  }
}
