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
import { ObjectUnsubscribedError, identity } from 'rxjs';

@Controller('todo')
export class TodoController {
  constructor() {
    this.todo = [];
  }
  todo: Todo[];
  //   all tasks
  @Get()
  @HttpCode(202)
  getTodo(@Query() mesParams) {
    console.log(mesParams);
    return this.todo;
  }
  //  one task
  @Get(':id')
  getOne(@Param('id') id) {
    const todos = this.todo.find((actuelTodo: Todo) => actuelTodo.id == +id);
    if (todos) {
      return todos;
    } else {
      throw new NotFoundException(`L'id:${id} est introuvable `);
    }
  }

  @Post()
  @HttpCode(201)
  addTodo(@Body() newTodo: Todo) {
    if (this.todo.length) {
      newTodo.id = this.todo[this.todo.length - 1].id + 1;
    } else {
      newTodo.id = 1;
    }

    this.todo.push(newTodo);
    return newTodo;
  }
  //   suppression d'une task
  @Delete(':id')
  deleteTodo(@Param('id') id) {
    const index = this.todo.findIndex((todo: Todo) => todo.id === +id);
    if (index >= 0) {
      this.todo.splice(index, 1);
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
