import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attachments } from './Attachments';
import { Documents } from './Documents';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('document_attachment_document_id_foreign', ['documentId'], {})
@Index('document_attachment_attachment_id_foreign', ['attachmentId'], {})
@Entity('document_attachment', { schema: 'monsreal' })
export class DocumentAttachment extends BaseCustomEntity {
  @Column('int', { name: 'attachment_status', default: () => "'0'" })
  attachmentStatus: number;

  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;

  @Column('int', { name: 'attachment_id', nullable: true, unsigned: true })
  attachmentId: number | null;

  @ManyToOne(
    () => Attachments,
    (attachments) => attachments.documentAttachments,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'attachment_id', referencedColumnName: 'id' }])
  attachment: Attachments;

  @ManyToOne(() => Documents, (documents) => documents.documentAttachments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'document_id', referencedColumnName: 'id' }])
  document: Documents;
}
