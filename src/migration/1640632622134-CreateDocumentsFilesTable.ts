import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDocumentsCertificatesTable1640632622134
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE \`document_file\` (
            \`id\` int unsigned NOT NULL AUTO_INCREMENT,
            \`active\`     int       NOT NULL DEFAULT '1',
            \`created_at\` timestamp NULL     DEFAULT NULL,
            \`updated_at\` timestamp NULL     DEFAULT NULL,
            \`document_id\` int unsigned NOT NULL,
            \`file_name\` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
            \`original_name\` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
            PRIMARY KEY (\`id\`),
            KEY \`documents_files_document_id_foreign\` (\`document_id\`),
            CONSTRAINT \`documents_files_document_id_foreign\` FOREIGN KEY (\`document_id\`) REFERENCES \`documents\` (\`id\`)
          ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
