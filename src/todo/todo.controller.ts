import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  @Get()
  getTodo() {
    console.log('Voici les todos ');
    return 'To do trouves';
  }

  @Post()
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
