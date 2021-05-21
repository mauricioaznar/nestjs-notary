import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointments } from './Appointments';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('rooms', { schema: 'monsreal' })
export class Rooms extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @OneToMany(() => Appointments, (appointments) => appointments.room)
  appointments: Appointments[];
}
