import { Column, Entity, Index } from 'typeorm';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('document_operation_document_id_foreign', ['documentId'], {})
@Index('document_operation_operation_id_foreign', ['operationId'], {})
@Entity('document_operation', { schema: 'monsreal' })
export class DocumentOperation extends BaseCustomEntity {
  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;

  @Column('int', { name: 'operation_id', nullable: true, unsigned: true })
  operationId: number | null;
}
