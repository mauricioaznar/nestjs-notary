import { Column, Entity, OneToMany } from 'typeorm';
import { DocumentLawyer } from './DocumentLawyer';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('document_lawyer_type', { schema: 'monsreal' })
export class DocumentLawyerType extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @OneToMany(
    () => DocumentLawyer,
    (documentLawyer) => documentLawyer.documentLawyerType,
  )
  documentLawyers: DocumentLawyer[];
}
