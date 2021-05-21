import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Documents } from './Documents';
import { DocumentLawyerType } from './DocumentLawyerType';
import { Lawyers } from './Lawyers';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index(
  'document_lawyer_document_lawyer_type_id_foreign',
  ['documentLawyerTypeId'],
  {},
)
@Index('document_lawyer_document_id_foreign', ['documentId'], {})
@Index('document_lawyer_lawyer_id_foreign', ['lawyerId'], {})
@Entity('document_lawyer', { schema: 'monsreal' })
export class DocumentLawyer extends BaseCustomEntity {
  @Column('int', {
    name: 'document_lawyer_type_id',
    nullable: true,
    unsigned: true,
  })
  documentLawyerTypeId: number | null;

  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;

  @Column('int', { name: 'lawyer_id', nullable: true, unsigned: true })
  lawyerId: number | null;

  @ManyToOne(() => Documents, (documents) => documents.documentLawyers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'document_id', referencedColumnName: 'id' }])
  document: Documents;

  @ManyToOne(
    () => DocumentLawyerType,
    (documentLawyerType) => documentLawyerType.documentLawyers,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'document_lawyer_type_id', referencedColumnName: 'id' }])
  documentLawyerType: DocumentLawyerType;

  @ManyToOne(() => Lawyers, (lawyers) => lawyers.documentLawyers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'lawyer_id', referencedColumnName: 'id' }])
  lawyer: Lawyers;
}
