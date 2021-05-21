import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Documents } from './Documents';
import { Fields } from './Fields';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('document_field_document_id_foreign', ['documentId'], {})
@Index('document_field_field_id_foreign', ['fieldId'], {})
@Entity('document_field', { schema: 'monsreal' })
export class DocumentField extends BaseCustomEntity {
  @Column('varchar', { name: 'value', length: 255 })
  value: string;

  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;

  @Column('int', { name: 'field_id', nullable: true, unsigned: true })
  fieldId: number | null;

  @ManyToOne(() => Documents, (documents) => documents.documentFields, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'document_id', referencedColumnName: 'id' }])
  document: Documents;

  @ManyToOne(() => Fields, (fields) => fields.documentFields, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'field_id', referencedColumnName: 'id' }])
  field: Fields;
}
