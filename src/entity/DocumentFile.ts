import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Documents } from './Documents';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('documents_files_document_id_foreign', ['documentId'], {})
@Entity('document_file', { schema: 'monsreal' })
export class DocumentFile extends BaseCustomEntity {
  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;

  @Column('varchar', { name: 'file_name', length: 255 })
  fileName: string;

  @Column('varchar', { name: 'original_name', length: 255 })
  originalName: string;

  @ManyToOne(() => Documents, (documents) => documents.documentFiles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'document_id', referencedColumnName: 'id' }])
  document: Documents;
}
