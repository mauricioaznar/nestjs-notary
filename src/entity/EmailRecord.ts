import { Column, Entity } from 'typeorm';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('email_record', { schema: 'monsreal' })
export class EmailRecord extends BaseCustomEntity {
  @Column('varchar', { name: 'from', length: 255 })
  from: string;

  @Column('varchar', { name: 'to', length: 255 })
  to: string;

  @Column('varchar', { name: 'subject', length: 255 })
  subject: string;

  @Column('text', { name: 'body', nullable: true })
  body: string | null;
}
