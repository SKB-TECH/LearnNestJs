import { TimeStamps } from '../../../Times/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('cv')
export class CvEntity extends TimeStamps {
  @PrimaryGeneratedColumn()
  id: number;

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
}
