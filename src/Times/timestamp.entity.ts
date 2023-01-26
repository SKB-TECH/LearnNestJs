import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class TimeStamps {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
