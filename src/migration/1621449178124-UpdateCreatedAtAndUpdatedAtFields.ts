import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatedAtAndUpdatedAtFields1621449178124
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("SET SQL_MODE='ALLOW_INVALID_DATES';");

    // users
    await queryRunner.query(
      'ALTER TABLE `users` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `users` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `users` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `users` ALTER `updated_at` SET DEFAULT null;',
    );

    // user_notification
    await queryRunner.query(
      'ALTER TABLE `user_notification` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `user_notification` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `user_notification` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `user_notification` ALTER `updated_at` SET DEFAULT null;',
    );

    // user_group
    await queryRunner.query(
      'ALTER TABLE `user_group` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `user_group` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `user_group` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `user_group` ALTER `updated_at` SET DEFAULT null;',
    );

    // rooms
    await queryRunner.query(
      'ALTER TABLE `rooms` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `rooms` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `rooms` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `rooms` ALTER `updated_at` SET DEFAULT null;',
    );

    // roles
    await queryRunner.query(
      'ALTER TABLE `roles` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `roles` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `roles` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `roles` ALTER `updated_at` SET DEFAULT null;',
    );

    // operations
    await queryRunner.query(
      'ALTER TABLE `operations` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `operations` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `operations` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `operations` ALTER `updated_at` SET DEFAULT null;',
    );

    // notification_type
    await queryRunner.query(
      'ALTER TABLE `notification_type` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `notification_type` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `notification_type` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `notification_type` ALTER `updated_at` SET DEFAULT null;',
    );

    // lawyers
    await queryRunner.query(
      'ALTER TABLE `lawyers` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `lawyers` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `lawyers` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `lawyers` ALTER `updated_at` SET DEFAULT null;',
    );

    // groups
    await queryRunner.query(
      'ALTER TABLE `groups` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `groups` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `groups` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `groups` ALTER `updated_at` SET DEFAULT null;',
    );

    // grantors
    await queryRunner.query(
      'ALTER TABLE `grantors` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `grantors` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `grantors` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `grantors` ALTER `updated_at` SET DEFAULT null;',
    );

    // fields
    await queryRunner.query(
      'ALTER TABLE `fields` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `fields` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `fields` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `fields` ALTER `updated_at` SET DEFAULT null;',
    );

    // email_record
    await queryRunner.query(
      'ALTER TABLE `email_record` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `email_record` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `email_record` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `email_record` ALTER `updated_at` SET DEFAULT null;',
    );

    // documents
    await queryRunner.query(
      'ALTER TABLE `documents` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `documents` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `documents` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `documents` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_user
    await queryRunner.query(
      'ALTER TABLE `document_user` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_user` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_user` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_user` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_type_operation
    await queryRunner.query(
      'ALTER TABLE `document_type_operation` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_type_operation` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_type_operation` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_type_operation` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_type_attachment
    await queryRunner.query(
      'ALTER TABLE `document_type_attachment` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_type_attachment` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_type_attachment` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_type_attachment` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_type
    await queryRunner.query(
      'ALTER TABLE `document_type` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_type` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_type` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_type` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_status
    await queryRunner.query(
      'ALTER TABLE `document_status` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_status` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_status` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_status` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_record
    await queryRunner.query(
      'ALTER TABLE `document_record` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_record` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_record` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_record` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_property
    await queryRunner.query(
      'ALTER TABLE `document_property` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_property` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_property` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_property` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_operation
    await queryRunner.query(
      'ALTER TABLE `document_operation` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_operation` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_operation` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_operation` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_lawyer_type
    await queryRunner.query(
      'ALTER TABLE `document_lawyer_type` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_lawyer_type` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_lawyer_type` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_lawyer_type` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_lawyer
    await queryRunner.query(
      'ALTER TABLE `document_lawyer` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_lawyer` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_lawyer` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_lawyer` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_group
    await queryRunner.query(
      'ALTER TABLE `document_group` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_group` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_group` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_group` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_grantor
    await queryRunner.query(
      'ALTER TABLE `document_grantor` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_grantor` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_grantor` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_grantor` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_field
    await queryRunner.query(
      'ALTER TABLE `document_field` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_field` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_field` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_field` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_comment
    await queryRunner.query(
      'ALTER TABLE `document_comment` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_comment` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_comment` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_comment` ALTER `updated_at` SET DEFAULT null;',
    );

    // document_attachment
    await queryRunner.query(
      'ALTER TABLE `document_attachment` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_attachment` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_attachment` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `document_attachment` ALTER `updated_at` SET DEFAULT null;',
    );

    // clients
    await queryRunner.query(
      'ALTER TABLE `clients` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `clients` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `clients` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `clients` ALTER `updated_at` SET DEFAULT null;',
    );

    // client_grantor
    await queryRunner.query(
      'ALTER TABLE `client_grantor` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `client_grantor` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `client_grantor` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `client_grantor` ALTER `updated_at` SET DEFAULT null;',
    );

    // attachments
    await queryRunner.query(
      'ALTER TABLE `attachments` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `attachments` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `attachments` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `attachments` ALTER `updated_at` SET DEFAULT null;',
    );

    // appointments
    await queryRunner.query(
      'ALTER TABLE `appointments` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `appointments` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `appointments` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `appointments` ALTER `updated_at` SET DEFAULT null;',
    );

    // appointment_user
    await queryRunner.query(
      'ALTER TABLE `appointment_user` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `appointment_user` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `appointment_user` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `appointment_user` ALTER `updated_at` SET DEFAULT null;',
    );

    // appointment_client
    await queryRunner.query(
      'ALTER TABLE `appointment_client` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `appointment_client` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `appointment_client` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `appointment_client` ALTER `updated_at` SET DEFAULT null;',
    );

    // activities
    await queryRunner.query(
      'ALTER TABLE `activities` MODIFY COLUMN `created_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `activities` MODIFY COLUMN `updated_at` datetime NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE `activities` ALTER `created_at` SET DEFAULT null;',
    );
    await queryRunner.query(
      'ALTER TABLE `activities` ALTER `updated_at` SET DEFAULT null;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
