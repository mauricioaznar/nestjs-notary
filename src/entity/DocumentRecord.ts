import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Documents } from './Documents';
import { Users } from './Users';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('document_record_document_id_foreign', ['documentId'], {})
@Index('document_record_user_id_foreign', ['userId'], {})
@Entity('document_record', { schema: 'monsreal' })
export class DocumentRecord extends BaseCustomEntity {
  @Column('varchar', { name: 'type', length: 255 })
  type: string;

  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;

  @Column('int', { name: 'user_id', nullable: true, unsigned: true })
  userId: number | null;

  @ManyToOne(() => Documents, (documents) => documents.documentRecords, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'document_id', referencedColumnName: 'id' }])
  document: Documents;

  @ManyToOne(() => Users, (users) => users.documentRecords, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
