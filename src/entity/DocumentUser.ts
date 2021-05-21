import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Documents } from './Documents';
import { Users } from './Users';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('document_user_user_id_foreign', ['userId'], {})
@Index('document_user_document_id_foreign', ['documentId'], {})
@Entity('document_user', { schema: 'monsreal' })
export class DocumentUser extends BaseCustomEntity {
  @Column('tinyint', { name: 'entry_lawyer', width: 1, default: () => "'0'" })
  entryLawyer: boolean;

  @Column('tinyint', { name: 'closure_lawyer', width: 1, default: () => "'0'" })
  closureLawyer: boolean;

  @Column('int', { name: 'user_id', nullable: true, unsigned: true })
  userId: number | null;

  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;

  @ManyToOne(() => Documents, (documents) => documents.documentUsers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'document_id', referencedColumnName: 'id' }])
  document: Documents;

  @ManyToOne(() => Users, (users) => users.documentUsers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
