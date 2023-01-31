import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { subscribeDTO } from './dto/subscribeDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entites/user.entity/user.entity';
import { Repository } from 'typeorm';
import * as bycript from 'bcrypt';
import { CredentialDto } from './dto/creadentialDto';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async register(userData: subscribeDTO): Promise<Partial<UserEntity>> {
    const user = await this.userRepository.create({
      ...userData,
    });

    user.salt = await bycript.genSalt();
    user.password = await bycript.hash(user.password, user.salt);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new ConflictException(
        `Les informations user doivent etre unique ${error}`,
      );
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }

  async login(credential: CredentialDto): Promise<Partial<UserEntity>> {
    const { email, password } = credential;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email= :email or user.password= :password')
      .setParameters({ email, password })
      .getOne();

    if (!user) {
      throw new NotFoundException('email or password is not correct !!!');
    }
    console.log(user);
    const isMatch = await bycript.compare(password, (await user).password);
    if (isMatch) {
      return {
        username: (await user).username,
        email: (await user).email,
        role: (await user).role,
      };
    } else {
      throw new NotFoundException('email or password is not correct !!!');
    }
  }
}
