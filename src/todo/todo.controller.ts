import {
  Body,
  HttpStatus,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Todo } from './entite/to.entity';
import { AddTodos } from './dto/add-todo.dto';
import { GetPagination } from './dto/get-Pagination';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  todos: Todo[];
  //   all tasks
  @Get()
  @HttpCode(202)
  getTodo(@Query() mesParams: GetPagination) {
    console.log(mesParams);
    return this.todoService.getTodo;
  }
  //  one task
  @Get(':id')
  getOne(@Param('id') id) {
    const todos = this.todos.find((actuelTodo: Todo) => actuelTodo.id == +id);
    if (todos) {
      return todos;
    } else {
      throw new NotFoundException(`L'id:${id} est introuvable `);
    }
  }

  @Post()
  @HttpCode(201)
  addTodo(@Body() newTodo: AddTodos) {
    const todo = new Todo();
    const { name, description } = newTodo;
    todo.name = name;
    todo.description = description;
    if (this.todos.length) {
      todo.id = this.todos[this.todos.length - 1].id + 1;
    } else {
      todo.id = 1;
    }

    this.todos.push(todo);
    return todo;
  }
  //   suppression d'une task
  @Delete(':id')
  deleteTodo(@Param('id') id) {
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

  @Put(':id')
  updateTodo(@Param('id') id, @Body() data: Partial<Todo>) {
    const todo = this.getOne(id);
    todo.description = data.description ? data.description : todo.description;
    todo.name = data.name ? data.name : todo.name;
    return todo;
  }
}
