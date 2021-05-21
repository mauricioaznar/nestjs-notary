import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('appointment_client_appointment_id_foreign', ['appointmentId'], {})
@Index('appointment_client_client_id_foreign', ['clientId'], {})
@Entity('appointment_client', { schema: 'monsreal' })
export class AppointmentClient extends BaseCustomEntity {
  @Column('int', { name: 'appointment_id', nullable: true, unsigned: true })
  appointmentId: number | null;

  @Column('int', { name: 'client_id', nullable: true, unsigned: true })
  clientId: number | null;

  // @ManyToOne(
  //   () => Appointments,
  //   (appointments) => appointments.appointmentClients,
  //   { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  // )
  // @JoinColumn([{ name: 'appointment_id', referencedColumnName: 'id' }])
  // appointment: Appointments;
  //
  // @ManyToOne(() => Clients, (clients) => clients.appointmentClients, {
  //   onDelete: 'NO ACTION',
  //   onUpdate: 'NO ACTION',
  // })
  // @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  // client: Clients;
}
