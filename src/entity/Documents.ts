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
import { DocumentField } from './DocumentField';
import { DocumentLawyer } from './DocumentLawyer';
import { DocumentProperty } from './DocumentProperty';
import { DocumentRecord } from './DocumentRecord';
import { DocumentUser } from './DocumentUser';
import { Clients } from './Clients';
import { DocumentStatus } from './DocumentStatus';
import { DocumentType } from './DocumentType';
import { UserNotification } from './UserNotification';
import { Operations } from './Operations';
import { Grantors } from './Grantors';
import { Groups } from './Groups';
import { Attachments } from './Attachments';
import { Users } from './Users';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Index('documents_document_type_id_foreign', ['documentTypeId'], {})
@Index('documents_document_status_id_foreign', ['documentStatusId'], {})
@Index('documents_client_id_foreign', ['clientId'], {})
@Entity('documents', { schema: 'monsreal' })
export class Documents extends BaseCustomEntity {
  @Column('varchar', { name: 'folio', length: 255 })
  folio: string;

  @Column('varchar', { name: 'electronic_folio', length: 255 })
  electronicFolio: string;

  @Column('varchar', { name: 'tome', length: 255 })
  tome: string;

  @Column('varchar', { name: 'property', length: 255 })
  property: string;

  @Column('smallint', { name: 'identifications', default: () => "'0'" })
  identifications: number;

  @Column('smallint', { name: 'public_registry_patent', default: () => "'0'" })
  publicRegistryPatent: number;

  @Column('smallint', { name: 'document_registry', default: () => "'0'" })
  documentRegistry: number;

  @Column('smallint', { name: 'personalities', default: () => "'0'" })
  personalities: number;

  @Column('varchar', { name: 'marginal_notes', length: 255 })
  marginalNotes: string;

  @Column('date', { name: 'public_registry_entry_date', nullable: true })
  publicRegistryEntryDate: string | null;

  @Column('date', { name: 'public_registry_exit_date', nullable: true })
  publicRegistryExitDate: string | null;

  @Column('date', { name: 'date', nullable: true })
  date: string | null;

  @Column('date', { name: 'money_laundering_expiration_date', nullable: true })
  moneyLaunderingExpirationDate: string | null;

  @Column('smallint', { name: 'money_laundering', default: () => "'-1'" })
  moneyLaundering: number;

  @Column('varchar', { name: 'file_number', length: 255 })
  fileNumber: string;

  @Column('varchar', { name: 'document_type_other', length: 255 })
  documentTypeOther: string;

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

  @OneToMany(() => DocumentField, (documentField) => documentField.document)
  documentFields: DocumentField[];

  @OneToMany(() => DocumentLawyer, (documentLawyer) => documentLawyer.document)
  documentLawyers: DocumentLawyer[];

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

  @OneToMany(
    () => DocumentProperty,
    (documentProperty) => documentProperty.document,
  )
  documentProperties: DocumentProperty[];

  @OneToMany(() => DocumentRecord, (documentRecord) => documentRecord.document)
  documentRecords: DocumentRecord[];

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

  @OneToMany(
    () => UserNotification,
    (userNotification) => userNotification.document,
  )
  userNotifications: UserNotification[];
}
