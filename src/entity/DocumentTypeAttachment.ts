import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Attachments } from './Attachments';
import { DocumentType } from './DocumentType';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index(
  'document_type_attachment_document_type_id_foreign',
  ['documentTypeId'],
  {},
)
@Index('document_type_attachment_attachment_id_foreign', ['attachmentId'], {})
@Entity('document_type_attachment', { schema: 'monsreal' })
export class DocumentTypeAttachment extends BaseCustomEntity {
  @Column('int', { name: 'document_type_id', nullable: true, unsigned: true })
  documentTypeId: number | null;

  @Column('int', { name: 'attachment_id', nullable: true, unsigned: true })
  attachmentId: number | null;

  @ManyToOne(
    () => Attachments,
    (attachments) => attachments.documentTypeAttachments,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'attachment_id', referencedColumnName: 'id' }])
  attachment: Attachments;

  @ManyToOne(
    () => DocumentType,
    (documentType) => documentType.documentTypeAttachments,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'document_type_id', referencedColumnName: 'id' }])
  documentType: DocumentType;
}
