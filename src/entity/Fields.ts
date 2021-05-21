import { Column, Entity, OneToMany } from 'typeorm';
import { DocumentField } from './DocumentField';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('fields', { schema: 'monsreal' })
export class Fields extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'name_str', length: 255 })
  nameStr: string;

  @Column('varchar', { name: 'type', length: 255 })
  type: string;

  @OneToMany(() => DocumentField, (documentField) => documentField.field)
  documentFields: DocumentField[];
}
