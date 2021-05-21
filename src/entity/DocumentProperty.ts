import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Documents } from './Documents';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('document_property_document_id_foreign', ['documentId'], {})
@Entity('document_property', { schema: 'monsreal' })
export class DocumentProperty extends BaseCustomEntity {
  @Column('varchar', { name: 'property', length: 255 })
  property: string;

  @Column('int', { name: 'electronic_folio' })
  electronicFolio: number;

  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;

  @ManyToOne(() => Documents, (documents) => documents.documentProperties, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'document_id', referencedColumnName: 'id' }])
  document: Documents;
}
