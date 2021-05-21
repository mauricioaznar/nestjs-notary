import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Documents } from './Documents';
import { Users } from './Users';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('document_comment_document_id_foreign', ['documentId'], {})
@Index('document_comment_user_id_foreign', ['userId'], {})
@Entity('document_comment', { schema: 'monsreal' })
export class DocumentComment extends BaseCustomEntity {
  @Column('varchar', { name: 'comment', length: 255 })
  comment: string;

  @Column('int', { name: 'document_id', nullable: true, unsigned: true })
  documentId: number | null;

  @Column('int', { name: 'user_id', nullable: true, unsigned: true })
  userId: number | null;

  @ManyToOne(() => Documents, (documents) => documents.documentComments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'document_id', referencedColumnName: 'id' }])
  document: Documents;

  @ManyToOne(() => Users, (users) => users.documentComments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
