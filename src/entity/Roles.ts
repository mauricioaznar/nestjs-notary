import { Column, Entity, OneToMany } from 'typeorm';
import { Users } from './Users';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('roles', { schema: 'monsreal' })
export class Roles extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @OneToMany(() => Users, (users) => users.role)
  users: Users[];
}
