import { ConflictException, Injectable } from '@nestjs/common';
import { subscribeDTO } from './dto/subscribeDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entites/user.entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as bycript from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async register(userData: subscribeDTO): Promise<UserEntity> {
    const user = await this.userRepository.create({
      ...userData,
    });

    user.salt = await bycript.genSalt();
    user.password = await bycript.hash(user.password, user.salt);

    try {
      this.userRepository.save(user);
    } catch (error) {
      throw new ConflictException(
        `Les informations user doivent etre unique ${error}`,
      );
    }
    return null;
  }
}
