import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { dateTimeTransformer } from './date-time-transformer';

export class BaseCustomEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    transformer: dateTimeTransformer,
  })
  createdAt: Date | null;

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    transformer: dateTimeTransformer,
  })
  updatedAt: Date | null;

  @Column('int', { name: 'active', default: () => 1 })
  active: number;
}
