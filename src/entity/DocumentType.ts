import { Column, Entity, OneToMany } from 'typeorm';
import { DocumentTypeAttachment } from './DocumentTypeAttachment';
import { DocumentTypeOperation } from './DocumentTypeOperation';
import { Documents } from './Documents';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('document_type', { schema: 'monsreal' })
export class DocumentType extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @OneToMany(
    () => DocumentTypeAttachment,
    (documentTypeAttachment) => documentTypeAttachment.documentType,
  )
  documentTypeAttachments: DocumentTypeAttachment[];

  @OneToMany(
    () => DocumentTypeOperation,
    (documentTypeOperation) => documentTypeOperation.documentType,
  )
  documentTypeOperations: DocumentTypeOperation[];

  @OneToMany(() => Documents, (documents) => documents.documentType)
  documents: Documents[];
}
