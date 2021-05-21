import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Documents } from './Documents';
import { NotificationType } from './NotificationType';
import { Users } from './Users';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('user_notification_user_id_foreign', ['userId'], {})
@Index('user_notification_document_id_foreign', ['documentId'], {})
@Index(
  'user_notification_notification_type_id_foreign',
  ['notificationTypeId'],
  {},
)
@Entity('user_notification', { schema: 'monsreal' })
export class UserNotification extends BaseCustomEntity {
  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('varchar', { name: 'description', length: 255 })
  description: string;

  @Column('varchar', { name: 'priority', length: 255 })
  priority: string;

  @Column('int', { name: 'user_id', nullable: true, unsigned: true })
  userId: number | null;

  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;

  @Column('int', {
    name: 'notification_type_id',
    nullable: true,
    unsigned: true,
  })
  notificationTypeId: number | null;

  @ManyToOne(() => Documents, (documents) => documents.userNotifications, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'document_id', referencedColumnName: 'id' }])
  document: Documents;

  @ManyToOne(
    () => NotificationType,
    (notificationType) => notificationType.userNotifications,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'notification_type_id', referencedColumnName: 'id' }])
  notificationType: NotificationType;

  @ManyToOne(() => Users, (users) => users.userNotifications, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
