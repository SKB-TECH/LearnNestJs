import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/user/entites/user.entity/user.entity';
import { subscribeDTO } from './dto/subscribeDTO';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('register')
  async register(@Body() userData: subscribeDTO): Promise<UserEntity> {
    return await this.UserService.register(userData);
  }
}
