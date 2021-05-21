import { Column, Entity, OneToMany } from 'typeorm';
import { DocumentTypeOperation } from './DocumentTypeOperation';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('operations', { schema: 'monsreal' })
export class Operations extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @OneToMany(
    () => DocumentTypeOperation,
    (documentTypeOperation) => documentTypeOperation.operation,
  )
  documentTypeOperations: DocumentTypeOperation[];
}
