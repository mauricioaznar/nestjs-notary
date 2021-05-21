import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('document_grantor_grantor_id_foreign', ['grantorId'], {})
@Index('document_grantor_document_id_foreign', ['documentId'], {})
@Entity('document_grantor', { schema: 'monsreal' })
export class DocumentGrantor extends BaseCustomEntity {
  @Column('int', { name: 'grantor_id', nullable: true, unsigned: true })
  grantorId: number | null;

  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;
}
