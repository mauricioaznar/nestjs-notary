import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDocumentsUnusedFields1641233811258
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE documents
            DROP money_laundering_expiration_date
        `);

    await queryRunner.query(`
            ALTER TABLE documents
            DROP money_laundering
        `);

    await queryRunner.query(`
            ALTER TABLE documents
            DROP file_number
        `);

    await queryRunner.query(`
        ALTER TABLE document_user
            DROP FOREIGN KEY document_user_user_id_foreign
    `);

    await queryRunner.query(`
        ALTER TABLE document_user
            DROP FOREIGN KEY document_user_document_id_foreign
    `);

    await queryRunner.query(`
      DROP TABLE document_user; 
    `);

    await queryRunner.query(`
            ALTER TABLE documents
            DROP public_registry_exit_date
        `);

    await queryRunner.query(`
            ALTER TABLE documents
            DROP public_registry_entry_date
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
