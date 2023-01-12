import { HttpStatus } from '@nestjs/common';
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

@Controller('todo')
export class TodoController {
  @Get()
  @HttpCode(202)
  getTodo(@Req() request: Request, @Res() response: Response) {
    response.json();
    return 'To do trouves';
  }

  @Post()
  @HttpCode(201)
  addTodo() {
    console.log('Todo ajoute avec succe');
    return 'Todo a ete ajoute';
  }

  @Delete()
  deleteTodo() {
    console.log('Todo suprimer');
    return 'To deleted';
  }

  @Put()
  updateTodo() {
    console.log('Updated one todo please');
    return 'Todo is updated';
  }
}
