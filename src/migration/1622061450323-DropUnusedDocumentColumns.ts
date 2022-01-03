import { MigrationInterface, QueryRunner } from 'typeorm';

// columns

// electronic_folio
// property
// public_registry_patent
// personalities
// marginal_notes
// identifications
// document_type_other

export class DropUnusedDocumentColumns1622061450323
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE documents
            DROP electronic_folio
    `);

    await queryRunner.query(`
      ALTER TABLE documents
            DROP property
    `);

    await queryRunner.query(`
      ALTER TABLE documents
            DROP public_registry_patent
    `);

    await queryRunner.query(`
      ALTER TABLE documents
            DROP personalities
    `);

    await queryRunner.query(`
      ALTER TABLE documents
            DROP marginal_notes
    `);

    await queryRunner.query(`
        ALTER TABLE documents 
            DROP document_registry
    `);

    await queryRunner.query(`
      ALTER TABLE documents
            DROP identifications
    `);

    await queryRunner.query(`
      ALTER TABLE documents
            DROP document_type_other
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
