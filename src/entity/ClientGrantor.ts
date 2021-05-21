import {
  Column,
  Entity,
  Index,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('client_grantor_grantor_id_foreign', ['grantorId'], {})
@Index('client_grantor_client_id_foreign', ['clientId'], {})
@Entity('client_grantor', { schema: 'monsreal' })
export class ClientGrantor extends BaseCustomEntity {
  @Column('int', {
    name: 'grantor_id',
    nullable: true,
    unsigned: true,
    primary: false,
  })
  grantorId: number | null;

  @Column('int', {
    name: 'client_id',
    nullable: true,
    unsigned: true,
    primary: false,
  })
  clientId: number | null;
}
