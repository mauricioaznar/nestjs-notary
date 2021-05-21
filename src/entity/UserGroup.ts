import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Groups } from './Groups';
import { Users } from './Users';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('user_group_user_id_foreign', ['userId'], {})
@Index('user_group_group_id_foreign', ['groupId'], {})
@Entity('user_group', { schema: 'monsreal' })
export class UserGroup extends BaseCustomEntity {
  @Column('int', { name: 'user_id', nullable: true, unsigned: true })
  userId: number | null;

  @Column('int', { name: 'group_id', nullable: true, unsigned: true })
  groupId: number | null;

  @ManyToOne(() => Groups, (groups) => groups.userGroups, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  group: Groups;

  @ManyToOne(() => Users, (users) => users.userGroups, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
