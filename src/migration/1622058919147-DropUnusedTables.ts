import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropUnusedTables1622058919147 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // document_field table
    await queryRunner.query(`
        ALTER TABLE document_field
            DROP FOREIGN KEY document_field_document_id_foreign
    `);

    await queryRunner.query(`
        ALTER TABLE document_field
            DROP FOREIGN KEY document_field_field_id_foreign
    `);

    await queryRunner.query(`
      DROP TABLE document_field ; 
    `);

    // document_record table
    await queryRunner.query(`
        ALTER TABLE document_record
            DROP FOREIGN KEY document_record_document_id_foreign
    `);

    await queryRunner.query(`
        ALTER TABLE document_record
            DROP FOREIGN KEY document_record_user_id_foreign
    `);

    await queryRunner.query(`
      DROP TABLE document_record ; 
    `);

    // document_lawyer table
    await queryRunner.query(`
        ALTER TABLE document_lawyer
            DROP FOREIGN KEY document_lawyer_document_id_foreign
    `);

    await queryRunner.query(`
        ALTER TABLE document_lawyer
            DROP FOREIGN KEY document_lawyer_document_lawyer_type_id_foreign
    `);

    await queryRunner.query(`
        ALTER TABLE document_lawyer 
            DROP FOREIGN KEY document_lawyer_lawyer_id_foreign
    `);

    await queryRunner.query(`
      DROP TABLE document_lawyer; 
    `);

    // document_lawyer_type table
    await queryRunner.query(`
      DROP TABLE document_lawyer_type; 
    `);

    // email_record
    await queryRunner.query(`
      DROP TABLE email_record; 
    `);

    // fields
    await queryRunner.query(`
      DROP TABLE fields; 
    `);

    // lawyers
    await queryRunner.query(`
      DROP TABLE lawyers; 
    `);

    // user notification
    await queryRunner.query(`
        ALTER TABLE user_notification
            DROP FOREIGN KEY user_notification_user_id_foreign
    `);

    await queryRunner.query(`
        ALTER TABLE user_notification
            DROP FOREIGN KEY user_notification_document_id_foreign
    `);

    await queryRunner.query(`
        ALTER TABLE user_notification
            DROP FOREIGN KEY user_notification_notification_type_id_foreign
    `);

    await queryRunner.query(`
      DROP TABLE user_notification; 
    `);

    // notification_type
    await queryRunner.query(`
      DROP TABLE notification_type; 
    `);

    // document_property
    await queryRunner.query(`
        ALTER TABLE document_property
            DROP FOREIGN KEY document_property_document_id_foreign
    `);

    await queryRunner.query(`
      DROP TABLE document_property; 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
