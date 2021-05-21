import { Column, Entity, Index } from 'typeorm';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('document_group_document_id_foreign', ['documentId'], {})
@Index('document_group_group_id_foreign', ['groupId'], {})
@Entity('document_group', { schema: 'monsreal' })
export class DocumentGroup extends BaseCustomEntity {
  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;

  @Column('int', { name: 'group_id', nullable: true, unsigned: true })
  groupId: number | null;
}
