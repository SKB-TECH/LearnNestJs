import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/user/entites/user.entity/user.entity';
import { subscribeDTO } from './dto/subscribeDTO';
import { CredentialDto } from './dto/creadentialDto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('register')
  async register(@Body() userData: subscribeDTO): Promise<Partial<UserEntity>> {
    return await this.UserService.register(userData);
  }

  @Post('login')
  async login(@Body() credentialDto: CredentialDto) {
    return await this.UserService.login(credentialDto);
  }
}
