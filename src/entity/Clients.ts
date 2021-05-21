import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Documents } from './Documents';
import { Grantors } from './Grantors';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('clients', { schema: 'monsreal' })
export class Clients extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'lastname', length: 255 })
  lastname: string;

  @Column('varchar', { name: 'fullname', length: 255 })
  fullname: string;

  @Column('varchar', { name: 'email', length: 255, default: () => "''" })
  email: string;

  @Column('varchar', { name: 'phone', length: 255, default: () => "''" })
  phone: string;

  @Column('varchar', { name: 'address1', length: 60, default: () => "''" })
  address1: string;

  @Column('varchar', { name: 'address2', length: 60, default: () => "''" })
  address2: string;

  @Column('varchar', { name: 'country', length: 255, default: () => "''" })
  country: string;

  @Column('varchar', { name: 'city', length: 255, default: () => "''" })
  city: string;

  @Column('varchar', { name: 'zip_code', length: 255, default: () => "''" })
  zipCode: string;

  @ManyToMany(() => Grantors)
  @JoinTable({
    name: 'client_grantor', // table name for the junction table of this relation
    joinColumn: {
      name: 'client_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'grantor_id',
      referencedColumnName: 'id',
    },
  })
  grantors: Grantors[];

  // @OneToMany(() => ClientGrantor, (clientGrantor) => clientGrantor.client)
  // clientGrantors: ClientGrantor[];

  @OneToMany(() => Documents, (documents) => documents.client)
  documents: Documents[];
}
