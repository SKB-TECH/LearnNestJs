import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('skb-tech/v1')
  getHello(): string {
    return this.appService.getHello();
  }
}
