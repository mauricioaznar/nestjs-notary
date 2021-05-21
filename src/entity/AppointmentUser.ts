import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('appointment_user_appointment_id_foreign', ['appointmentId'], {})
@Index('appointment_user_user_id_foreign', ['userId'], {})
@Entity('appointment_user', { schema: 'monsreal' })
export class AppointmentUser extends BaseCustomEntity {
  @Column('int', { name: 'appointment_id', nullable: true, unsigned: true })
  appointmentId: number | null;

  @Column('int', { name: 'user_id', nullable: true, unsigned: true })
  userId: number | null;

  // @ManyToOne(() => Users, (users) => users.appointmentUsers, {
  //   onDelete: 'NO ACTION',
  //   onUpdate: 'NO ACTION',
  // })
  // @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  // user: Users;
}
