import { Column, Entity, OneToMany } from 'typeorm';
import { Documents } from './Documents';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('document_status', { schema: 'monsreal' })
export class DocumentStatus extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @OneToMany(() => Documents, (documents) => documents.documentStatus)
  documents: Documents[];
}
