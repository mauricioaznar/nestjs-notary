import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DocumentAttachment } from './DocumentAttachment';
import { DocumentComment } from './DocumentComment';
import { DocumentUser } from './DocumentUser';
import { Clients } from './Clients';
import { DocumentStatus } from './DocumentStatus';
import { DocumentType } from './DocumentType';
import { Operations } from './Operations';
import { Grantors } from './Grantors';
import { Groups } from './Groups';
import { Attachments } from './Attachments';
import { Users } from './Users';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';
import { DocumentFile } from './DocumentFile';

@Index('documents_document_type_id_foreign', ['documentTypeId'], {})
@Index('documents_document_status_id_foreign', ['documentStatusId'], {})
@Index('documents_client_id_foreign', ['clientId'], {})
@Entity('documents', { schema: 'monsreal' })
export class Documents extends BaseCustomEntity {
  @Column('varchar', { name: 'folio', length: 255 })
  folio: string;

  @Column('varchar', { name: 'tome', length: 255 })
  tome: string;

  @Column('date', { name: 'public_registry_entry_date', nullable: true })
  publicRegistryEntryDate: string | null;

  @Column('date', { name: 'public_registry_exit_date', nullable: true })
  publicRegistryExitDate: string | null;

  @Column('int', { name: 'year', nullable: true, unsigned: true })
  year: number | null;

  @Column('date', { name: 'money_laundering_expiration_date', nullable: true })
  moneyLaunderingExpirationDate: string | null;

  @Column('smallint', { name: 'money_laundering', default: () => "'-1'" })
  moneyLaundering: number;

  @Column('varchar', { name: 'file_number', length: 255 })
  fileNumber: string;

  @Column('int', { name: 'document_type_id', nullable: true, unsigned: true })
  documentTypeId: number | null;

  @Column('int', { name: 'document_status_id', nullable: true, unsigned: true })
  documentStatusId: number | null;

  @Column('int', { name: 'client_id', nullable: true, unsigned: true })
  clientId: number | null;

  @OneToMany(
    () => DocumentComment,
    (documentComment) => documentComment.document,
  )
  documentComments: DocumentComment[];

  @OneToMany(() => DocumentFile, (df) => df.document)
  documentFiles: DocumentFile[];

  @ManyToMany(() => Operations)
  @JoinTable({
    name: 'document_operation', // table name for the junction table of this relation
    joinColumn: {
      name: 'document_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'operation_id',
      referencedColumnName: 'id',
    },
  })
  operations: Operations[];

  @ManyToMany(() => Users)
  @JoinTable({
    name: 'document_user', // table name for the junction table of this relation
    joinColumn: {
      name: 'document_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  entryUsers: Users[];

  @ManyToMany(() => Users)
  @JoinTable({
    name: 'document_user', // table name for the junction table of this relation
    joinColumn: {
      name: 'document_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  closureUsers: Users[];

  @ManyToMany(() => Attachments)
  @JoinTable({
    name: 'document_attachment', // table name for the junction table of this relation
    joinColumn: {
      name: 'document_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'attachment_id',
      referencedColumnName: 'id',
    },
  })
  attachments: Attachments[];

  @OneToMany(
    () => DocumentAttachment,
    (documentAttachment) => documentAttachment.document,
  )
  documentAttachments: DocumentAttachment[];

  @ManyToMany(() => Grantors)
  @JoinTable({
    name: 'document_grantor', // table name for the junction table of this relation
    joinColumn: {
      name: 'document_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'grantor_id',
      referencedColumnName: 'id',
    },
  })
  grantors: Grantors[];

  @ManyToMany(() => Groups)
  @JoinTable({
    name: 'document_group', // table name for the junction table of this relation
    joinColumn: {
      name: 'document_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: Groups[];

  @OneToMany(() => DocumentUser, (documentUser) => documentUser.document)
  documentUsers: DocumentUser[];

  @ManyToOne(() => Clients, (clients) => clients.documents, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  client: Clients;

  @ManyToOne(
    () => DocumentStatus,
    (documentStatus) => documentStatus.documents,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'document_status_id', referencedColumnName: 'id' }])
  documentStatus: DocumentStatus;

  @ManyToOne(() => DocumentType, (documentType) => documentType.documents, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'document_type_id', referencedColumnName: 'id' }])
  documentType: DocumentType;
}
