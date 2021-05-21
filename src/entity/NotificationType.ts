import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserNotification } from './UserNotification';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('notification_type', { schema: 'monsreal' })
export class NotificationType extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @OneToMany(
    () => UserNotification,
    (userNotification) => userNotification.notificationType,
  )
  userNotifications: UserNotification[];
}
