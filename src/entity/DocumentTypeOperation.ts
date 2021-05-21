import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DocumentType } from './DocumentType';
import { Operations } from './Operations';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index(
  'document_type_operation_document_type_id_foreign',
  ['documentTypeId'],
  {},
)
@Index('document_type_operation_operation_id_foreign', ['operationId'], {})
@Entity('document_type_operation', { schema: 'monsreal' })
export class DocumentTypeOperation extends BaseCustomEntity {
  @Column('int', { name: 'document_type_id', nullable: true, unsigned: true })
  documentTypeId: number | null;

  @Column('int', { name: 'operation_id', nullable: true, unsigned: true })
  operationId: number | null;

  @ManyToOne(
    () => DocumentType,
    (documentType) => documentType.documentTypeOperations,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'document_type_id', referencedColumnName: 'id' }])
  documentType: DocumentType;

  @ManyToOne(
    () => Operations,
    (operations) => operations.documentTypeOperations,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'operation_id', referencedColumnName: 'id' }])
  operation: Operations;
}
