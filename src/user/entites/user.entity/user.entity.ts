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

@Entity('user')
export class UserEntity extends TimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany((type) => CvEntity, (cv) => cv.user)
  cvs: CvEntity[];
}
