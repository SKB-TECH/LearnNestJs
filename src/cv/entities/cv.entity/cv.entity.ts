import { UserEntity } from 'src/user/entites/user.entity/user.entity';
import { TimeStamps } from '../../../Times/timestamp.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { type, userInfo } from 'os';
@Entity('cv')
export class CvEntity extends TimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: number;

  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne((type) => UserEntity, (user) => user.cvs)
  user: UserEntity;
}
