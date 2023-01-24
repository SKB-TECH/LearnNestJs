import {
  Body,
  HttpStatus,
  NotFoundException,
  Options,
  Param,
  ParseIntPipe,
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
import { AddTodosDto } from './dto/add-todo.dto';
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
    console.log(mesParams instanceof GetPagination);
    return this.todoService.getTodo();
  }
  //  one task
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id): Todo {
    return this.todoService.getTodoById(id);
  }
  // add a new to do
  @Post()
  @HttpCode(201)
  addTodo(@Body() newTodo: AddTodosDto): Todo {
    return this.todoService.addTodo(newTodo);
  }
  // delete one todo
  @Delete(':id')
  deleteTodo(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id,
  ) {
    console.log(typeof id);
    return this.todoService.deleteOneTodo(id);
  }
  @Put(':id')
  updateTodo(@Param('id') id, @Body() data: Partial<Todo>) {
    return this.updateTodo(id, data);
  }
}
