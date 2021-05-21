import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentAttachment } from './DocumentAttachment';
import { DocumentTypeAttachment } from './DocumentTypeAttachment';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('attachments', { schema: 'monsreal' })
export class Attachments extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @OneToMany(
    () => DocumentAttachment,
    (documentAttachment) => documentAttachment.attachment,
  )
  documentAttachments: DocumentAttachment[];

  @OneToMany(
    () => DocumentTypeAttachment,
    (documentTypeAttachment) => documentTypeAttachment.attachment,
  )
  documentTypeAttachments: DocumentTypeAttachment[];
}
