import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('activities_user_id_foreign', ['userId'], {})
@Entity('activities', { schema: 'inopack' })
export class Activities extends BaseCustomEntity {
  @Column('varchar', { name: 'description', length: 255 })
  description: string;

  @Column('varchar', { name: 'type', length: 255 })
  type: string;

  @Column('int', { name: 'user_id', nullable: false, unsigned: true })
  userId: number;

  @Column('int', { name: 'entity_id', nullable: false, unsigned: true })
  entityId: number;

  @Column('varchar', { name: 'entity_name', length: 255 })
  entityName: number;

  @ManyToOne(() => Users, (users) => users.activities, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
