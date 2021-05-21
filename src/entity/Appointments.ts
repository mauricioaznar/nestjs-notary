import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Users } from './Users';
import { Rooms } from './Rooms';
import { Clients } from './Clients';
import { dateTimeTransformer } from './helpers/date-time-transformer';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('appointments_room_id_foreign', ['roomId'], {})
@Index('appointments_created_by_user_id_foreign', ['createdByUserId'], {})
@Entity('appointments', { schema: 'monsreal' })
export class Appointments extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'description', length: 255 })
  description: string;

  @Column('datetime', {
    name: 'start_date',
    nullable: true,
    transformer: dateTimeTransformer,
  })
  startDate: Date | null;

  @Column('datetime', {
    name: 'end_date',
    nullable: true,
    transformer: dateTimeTransformer,
  })
  endDate: Date | null;

  @Column('tinyint', { name: 'finished', width: 1, default: () => "'0'" })
  finished: boolean;

  @Column('int', { name: 'room_id', nullable: true, unsigned: true })
  roomId: number | null;

  @Column('int', { name: 'created_by_user_id', nullable: true, unsigned: true })
  createdByUserId: number | null;

  @ManyToMany(() => Clients)
  @JoinTable({
    name: 'appointment_client', // table name for the junction table of this relation
    joinColumn: {
      name: 'appointment_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'client_id',
      referencedColumnName: 'id',
    },
  })
  clients: Clients[];

  @ManyToMany(() => Users)
  @JoinTable({
    name: 'appointment_user', // table name for the junction table of this relation
    joinColumn: {
      name: 'appointment_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: Users[];

  @ManyToOne(() => Users, (users) => users.appointments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'created_by_user_id', referencedColumnName: 'id' }])
  createdByUser: Users;

  @ManyToOne(() => Rooms, (rooms) => rooms.appointments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'id' }])
  room: Rooms;
}
