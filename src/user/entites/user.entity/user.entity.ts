import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { TimeStamps } from '../../../Times/timestamp.entity';
import { CvEntity } from '../../../cv/entities/cv.entity/cv.entity';
import { rolesUser } from '../../../user-role-enum/userRoles';

@Entity('user')
export class UserEntity extends TimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: rolesUser,
    default: rolesUser.USER,
  })
  role: string;

  salt: string;
  @Column({
    length: 55,
    unique: true,
  })
  name: string;

  @Column({
    length: 70,
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    length: 12,
  })
  password: string;

  @OneToMany((type) => CvEntity, (cv) => cv.user, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  cvs: CvEntity[];
}
