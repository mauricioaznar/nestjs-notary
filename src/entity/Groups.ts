import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from './Users';
import { UserGroup } from './UserGroup';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('groups_user_id_foreign', ['userId'], {})
@Entity('groups', { schema: 'monsreal' })
export class Groups extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'user_id', nullable: true, unsigned: true })
  userId: number | null;

  @ManyToOne(() => Users, (users) => users.groups, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group)
  userGroups: UserGroup[];

  @ManyToMany(() => Users)
  @JoinTable({
    name: 'user_group', // table name for the junction table of this relation
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: Users[];
}
